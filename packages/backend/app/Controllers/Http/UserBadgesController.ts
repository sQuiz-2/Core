import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { twitchRewards } from '@squiz/shared';
import User from 'App/Models/User';
import UserBadge from 'App/Models/UserBadge';
import TwitchBuyableBadgeValidator from 'App/Validators/TwitchBuyableBadgeValidator';

export default class UserBadgesController {
  public async show({ auth }: HttpContextContract) {
    await auth.user?.load('badges');
    return auth.user?.badges;
  }

  public async storeTwitchBuyable({ request, response }: HttpContextContract) {
    const data = await request.validate(TwitchBuyableBadgeValidator);
    const user = await User.findBy('provider_user_id', data.userId);
    if (!user) {
      return response.status(404).send('Twitch user id not founds');
    }
    const badge = twitchRewards.find(
      ({ rewardId, broadcasterId }) =>
        rewardId === data.rewardId && broadcasterId === data.streamerId,
    );
    if (!badge) {
      return response.status(404).send('Twitch reward not found');
    }
    const userBadge = await UserBadge.firstOrCreate({ userId: user.id, badgeId: badge.id });
    return userBadge;
  }
}
