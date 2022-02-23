import Logger from '@ioc:Adonis/Core/Logger';
import {
  badgeSpecialId,
  challengePoint,
  ChallengePointIds,
  challengeSpeed,
  ChallengeSpeedIds,
  challengeStreak,
  ChallengeStreakIds,
  Difficulty,
  DifficultyEnum,
} from '@squiz/shared';
import Challenge from 'App/Models/Challenge';
import ChallengeUser from 'App/Models/ChallengeUser';
import UserBadge from 'App/Models/UserBadge';

import Player, { PlayerChallengeInfos } from '../Player';

export type QuizChallengeParams = {
  difficulty: Difficulty;
};

type PlayerChallenge = {
  userId: number | undefined;
  challengeId: ChallengeSpeedIds | ChallengeStreakIds | ChallengePointIds;
};

type userBadge = {
  userId: number | undefined;
  badgeId: badgeSpecialId;
};

class QuizChallenges {
  difficulty: Difficulty;

  constructor(params: QuizChallengeParams) {
    this.difficulty = params.difficulty;
  }

  public async computeAndSaveChallenges(players: Player[]): Promise<void> {
    if (players.length < 5 || this.difficulty.id === DifficultyEnum.Random) return;
    const playersChallenges = this.checkAllPlayersChallenges(players);
    if (playersChallenges.length <= 0) return;
    await this.setSpecialBadges(playersChallenges);
    await this.savePlayersChallenges(playersChallenges);
  }

  private async savePlayersChallenges(playersChallenge: PlayerChallenge[]): Promise<void> {
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
      await ChallengeUser.fetchOrCreateMany(['userId', 'challengeId'], playersChallengeConverted);
    } catch (error) {
      Logger.error(error);
    }
  }

  private checkAllPlayersChallenges(players: Player[]) {
    const playersChallenge = players.map((player) => {
      const playerInfos = player.challengeInfos();
      const validatedChallenge = this.validatedChallenge(playerInfos);
      return validatedChallenge.map((challenge) => ({
        userId: player.dbId,
        challengeId: challenge,
      }));
    });
    return playersChallenge.flat();
  }

  private validatedChallenge(playerInfos: PlayerChallengeInfos) {
    const speedChallenge = this.checkSpeedChallenges(playerInfos.fastestAnswer);
    const streakChallenge = this.checkStreakChallenges(playerInfos.maxStreak);
    const pointChallenge = this.checkPointChallenges(playerInfos.points);
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
  }

  /**
   * Players can unlock special badges with their challenges
   */
  private async setSpecialBadges(playersChallenge: PlayerChallenge[]) {
    const badgesToCreates: userBadge[] = [];
    console.log(playersChallenge);
    for (const i of playersChallenge) {
      if (i.challengeId === ChallengeSpeedIds.oneSec) {
        badgesToCreates.push({ userId: i.userId, badgeId: badgeSpecialId.Fast });
      }
    }
    console.log(badgesToCreates);
    if (badgesToCreates.length <= 0) return;
    try {
      await UserBadge.fetchOrCreateMany(['userId', 'badgeId'], badgesToCreates);
    } catch (error) {
      Logger.error(error);
    }
  }
}

export default QuizChallenges;
