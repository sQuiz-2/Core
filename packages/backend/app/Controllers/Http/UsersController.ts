import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import {
  Avatars,
  badgeNames,
  computeLevel,
  isAllowedSpecialBadge,
  MeBasic,
  ProviderEnum,
  Ranks,
  badgeSpecialId,
  subBadges,
  badgeRewardId,
  badgeRewardIdValues,
  badgeSpecialIdValues,
  badgeSubIdValues,
  badgeSubId,
  TwitchInfo,
} from '@squiz/shared';
import RoomPool from 'App/Class/RoomPool';
import GameStat from 'App/Models/GameStat';
import RoundStat from 'App/Models/RoundStat';
import User from 'App/Models/User';
import { refreshToken } from 'App/Utils/oAuth/Twitch';
import AdminValidator from 'App/Validators/AdminValidator';
import FetchUsersValidator from 'App/Validators/FetchUsers';
import UserBanValidator from 'App/Validators/UserBanValidator';
import UserValidator from 'App/Validators/UserValidator';
import { twitchClientId } from 'Config/auth';
import got from 'got/dist/source';

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, limit = 10, playerSearch, banned } = await request.validate(
      FetchUsersValidator,
    );

    const query = User.query().orderBy('id');

    if (banned === true) {
      query.where('ban', true);
    }

    if (playerSearch) {
      query.whereRaw(`LOWER(username) LIKE ?`, ['%' + playerSearch.toLowerCase() + '%']);
    }
    return query.paginate(page, limit);
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const user = await User.findOrFail(id);
    return { id: user.id, email: user.email };
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(AdminValidator);
    const user = await User.create(data);
    return { id: user.id, email: user.email };
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(AdminValidator);
    const user = await User.findOrFail(id);
    user.merge(data);
    await user.save();
    return { id: user.id, email: user.email };
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const user = await User.findOrFail(id);
    return user.delete();
  }

  public async meBasic({ auth }: HttpContextContract) {
    if (!auth.user) return;
    const gameStats = await GameStat.query().where('user_id', auth.user.id);
    const roundStats = await RoundStat.query().where('user_id', auth.user.id);
    const meBasic: MeBasic = {
      experience: auth.user.experience,
      avatar: auth.user.avatar as keyof typeof Avatars,
      gameStats,
      roundStats,
      badge: auth.user.badge,
      createdDate: (auth.user.createdAt as unknown) as string,
      rank: auth.user.rank as Ranks,
    };
    return meBasic;
  }

  public async twitchToken({ auth }: HttpContextContract) {
    if (!auth.user) return;
    await auth.user.load('oAuthToken');
    const twitchInfos = auth.user.oAuthToken.find(
      ({ providerId }) => providerId === ProviderEnum.Twitch,
    );
    const result: TwitchInfo = {
      twitchId: twitchInfos?.providerUserId,
      twitchToken: twitchInfos?.token,
    };
    return result;
  }

  public async publicUser({ params, response }: HttpContextContract) {
    const { id } = params;
    if (isNaN(id)) {
      return response.status(400);
    }
    const statsGames = await Database.query()
      .from('users')
      .select(
        'users.experience',
        'users.username',
        Database.raw('sum(game_stats.played) as game_played'),
        Database.raw('sum(game_stats.podium) as game_podium'),
        Database.raw('sum(game_stats.win) as game_win'),
      )
      .leftJoin('game_stats', 'game_stats.user_id', 'users.id')
      .where('users.id', id)
      .groupBy('users.id')
      .first();
    const statsRounds = await Database.query()
      .from('users')
      .select(
        Database.raw('sum(round_stats.correct) as round_correct'),
        Database.raw('sum(round_stats.played) as round_played'),
      )
      .leftJoin('round_stats', 'round_stats.user_id', 'users.id')
      .where('users.id', id)
      .groupBy('users.id')
      .first();
    return { ...statsGames, ...statsRounds };
  }

  public async editMe({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(UserValidator);
    if (data.avatar) {
      // Check if the user as the required level
      const avatarRequiredLevel = Avatars[data.avatar];
      if (
        isNaN(avatarRequiredLevel) ||
        avatarRequiredLevel > computeLevel(auth.user!.experience).level
      ) {
        return response.status(403);
      }
      auth.user!.avatar = data.avatar;
    }
    if (data.badge && badgeSpecialIdValues.includes(data.badge as badgeSpecialId)) {
      // Special badges
      const { rank } = auth.user!;
      let isAllowed = isAllowedSpecialBadge(data.badge as badgeSpecialId, {
        rank: rank as Ranks,
      });
      if (isAllowed === false) {
        await auth.user?.load('badges');
        const userBadges = auth.user?.badges.map(({ badgeId }) => badgeId);
        if (userBadges && userBadges.includes(data.badge)) {
          isAllowed = true;
        }
      }
      if (isAllowed) {
        auth.user!.badge = data.badge;
      }
    } else if (data.badge && badgeRewardIdValues.includes(data.badge as badgeRewardId)) {
      // Rewards badges
      await auth.user?.load('badges');
      const userBadges = auth.user?.badges.map(({ badgeId }) => badgeId);
      if (userBadges && userBadges.includes(data.badge)) {
        auth.user!.badge = data.badge;
      }
    } else if (data.badge && badgeSubIdValues.includes(data.badge as badgeSubId)) {
      // Subs badges
      // Check if the user is sub
      const badgeInfos = subBadges.find((badge) => badge.id === data.badge);
      await auth.user?.load('oAuthToken');
      const twitchInfos = auth.user?.oAuthToken.find(
        ({ providerId }) => providerId === ProviderEnum.Twitch,
      );
      if (!twitchInfos || !badgeInfos) return response.status(403);
      try {
        await got(
          `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${badgeInfos.broadcasterId}&user_id=${twitchInfos.providerUserId}`,
          {
            headers: {
              Authorization: `Bearer ${twitchInfos.token}`,
              'content-type': 'application/json',
              'Client-id': twitchClientId,
            },
          },
        );
      } catch (ex) {
        return response.status(403);
      }
      auth.user!.badge = data.badge;
    } else if (data.badge && data.badge === badgeNames.Default) {
      // Default badge
      auth.user!.badge = data.badge;
    }
    return auth.user?.save();
  }

  public async refreshTwitchToken({ auth, response }: HttpContextContract) {
    await auth.user!.load('oAuthToken');
    const twitchInfos = auth.user?.oAuthToken.find(
      ({ providerId }) => providerId === ProviderEnum.Twitch,
    );
    if (!twitchInfos) return response.status(401);
    const { refreshToken: token } = twitchInfos;
    try {
      const newTokens = await refreshToken(token);
      twitchInfos.refreshToken = newTokens.refresh_token;
      twitchInfos.token = newTokens.access_token;
      await twitchInfos.save();
      return { token: newTokens.access_token };
    } catch (error) {
      return response.status(401);
    }
  }

  public async ban({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const { reason } = await request.validate(UserBanValidator);

    if (isNaN(id)) {
      return response.status(422);
    }

    const user = await User.findOrFail(id);
    if (user.staff !== true) {
      user.merge({ ban: true, banReason: reason });
      user.save();
    }

    RoomPool.kickUser(user.username);
  }

  public async unban({ params, response }: HttpContextContract) {
    const { id } = params;

    if (isNaN(id)) {
      return response.status(422);
    }

    const user = await User.findOrFail(id);
    user.ban = false;
    await user.save();
  }
}
