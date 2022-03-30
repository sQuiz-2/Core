import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import {
  ChallengePointIds,
  ChallengeSpecialIds,
  ChallengeSpeedIds,
  ChallengeStreakIds,
  ChallengeWinIds,
} from '@squiz/shared';
import Challenge from 'App/Models/Challenge';

export default class ChallengeSeeder extends BaseSeeder {
  public async run() {
    const allChallenges: string[] = [
      ...Object.values(ChallengePointIds),
      ...Object.values(ChallengeSpeedIds),
      ...Object.values(ChallengeStreakIds),
      ...Object.values(ChallengeWinIds),
      ...Object.values(ChallengeSpecialIds),
    ];
    const titles: { title: string }[] = allChallenges.map((title: string) => ({
      title,
    }));
    try {
      await Challenge.updateOrCreateMany('title', titles);
    } catch (error) {
      console.error(error);
    }
  }
}
