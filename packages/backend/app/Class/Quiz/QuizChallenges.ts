import Logger from '@ioc:Adonis/Core/Logger';
import {
  badgeSpecialId,
  ChallengeSpecialIds,
  ChallengeSpeedIds,
  Difficulty,
  DifficultyEnum,
  PlayerChallenges,
} from '@squiz/shared';
import Challenge from 'App/Models/Challenge';
import ChallengeUser from 'App/Models/ChallengeUser';
import UserBadge from 'App/Models/UserBadge';

import Player from '../Player';

export type QuizChallengeParams = {
  difficulty: Difficulty;
};

export type PlayerChallenge = {
  socketId: string;
  challengeId: string;
};

type userBadge = {
  userId: number | undefined;
  badgeId: badgeSpecialId;
};

class QuizChallenges {
  difficulty: Difficulty;
  enoughPlayers: boolean = false;

  constructor(params: QuizChallengeParams) {
    this.difficulty = params.difficulty;
  }

  public async computeAndSaveChallenges(players: Player[]): Promise<PlayerChallenge[]> {
    if (this.difficulty.id === DifficultyEnum.Random) return [];
    if (players.length >= 5) {
      this.enoughPlayers = true;
    }
    const playersChallenges = this.checkAllPlayersChallenges(players);
    if (playersChallenges.length <= 0) return [];
    await this.setSpecialBadges(playersChallenges);
    const playerToNotify = await this.savePlayersChallenges(playersChallenges);
    return playerToNotify;
  }

  private async savePlayersChallenges(
    playersChallenge: PlayerChallenges[],
  ): Promise<PlayerChallenge[]> {
    const challengeIds = await Challenge.all();
    let playersChallengeConverted = playersChallenge.map((playerChallenge) => {
      const challenge = challengeIds.find(({ title }) => title === playerChallenge.challengeId);
      return {
        userId: playerChallenge.userId,
        challengeId: challenge ? challenge.id : 0,
      };
    });
    playersChallengeConverted = playersChallengeConverted.filter(
      ({ challengeId }) => challengeId !== 0,
    );

    try {
      const result = await ChallengeUser.fetchOrCreateMany(
        ['userId', 'challengeId'],
        playersChallengeConverted,
      );
      /**
       * Some people could already have unlocked trophies
       * so we remove them to don't display the notification
       */
      const freshlyUnlocked = result
        .filter(({ $isLocal }) => $isLocal)
        .map(({ userId, challengeId }) => ({
          socketId: playersChallenge.find(({ userId: id }) => id === userId)!.socketId,
          challengeId: challengeIds.find(({ id }) => id === challengeId)!.title,
        }));
      return freshlyUnlocked;
    } catch (error) {
      Logger.error(error);
    }
    return [];
  }

  private checkAllPlayersChallenges(players: Player[]) {
    const playersChallenge = players.map((player) => {
      // const playerInfos = player.challengeInfos();
      const validatedChallenge = [
        ChallengeSpecialIds.april2022,
      ]; /* this.validatedChallenge(playerInfos) */
      return validatedChallenge.map((challenge) => ({
        userId: player.dbId,
        challengeId: challenge,
        socketId: player.id,
      }));
    });
    return playersChallenge.flat();
  }

  /*   private validatedChallenge(playerInfos: PlayerChallengeInfos) {
    let pointChallenge: ChallengePointIds[] = [];
    const speedChallenge = this.checkSpeedChallenges(playerInfos.fastestAnswer);
    const streakChallenge = this.checkStreakChallenges(playerInfos.maxStreak);
    if (this.enoughPlayers) {
      pointChallenge = this.checkPointChallenges(playerInfos.points);
    }
    return [...speedChallenge, ...streakChallenge, ...pointChallenge];
  }

  private checkSpeedChallenges(fastestAnswer: number): ChallengeSpeedIds[] {
    const validated: ChallengeSpeedIds[] = challengeSpeed
      .filter(({ maxTime }) => fastestAnswer < maxTime)
      .map(({ id }) => id);
    return validated;
  }

  private checkStreakChallenges(maxStreak: number): ChallengeStreakIds[] {
    const validated: ChallengeStreakIds[] = challengeStreak
      .filter(
        ({ difficultyId, requiredStreak }) =>
          difficultyId === this.difficulty.id && maxStreak >= requiredStreak,
      )
      .map(({ id }) => id);
    return validated;
  }

  private checkPointChallenges(point: number): ChallengePointIds[] {
    const validated: ChallengePointIds[] = challengePoint
      .filter(
        ({ difficultyId, requiredPoint }) =>
          difficultyId === this.difficulty.id && point >= requiredPoint,
      )
      .map(({ id }) => id);

    return validated;
  } */

  /**
   * Players can unlock special badges with their challenges
   */
  private async setSpecialBadges(playersChallenge: PlayerChallenges[]) {
    const badgesToCreates: userBadge[] = [];
    for (const i of playersChallenge) {
      if (i.challengeId === ChallengeSpeedIds.oneSec) {
        badgesToCreates.push({ userId: i.userId, badgeId: badgeSpecialId.Fast });
      } else if (i.challengeId === ChallengeSpecialIds.april2022) {
        badgesToCreates.push({ userId: i.userId, badgeId: badgeSpecialId.April2022 });
      }
    }
    if (badgesToCreates.length <= 0) return;
    try {
      await UserBadge.fetchOrCreateMany(['userId', 'badgeId'], badgesToCreates);
    } catch (error) {
      Logger.error(error);
    }
  }
}

export default QuizChallenges;
