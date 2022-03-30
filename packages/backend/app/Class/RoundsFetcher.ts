import { DifficultyEnum } from '@squiz/shared';
import Round from 'App/Models/Round';

class RoundFetcher {
  isPrivate = true;

  constructor(isPrivate: boolean) {
    this.isPrivate = isPrivate;
  }
  /**
   * Pull new random rounds
   */
  public async getRounds(
    difficultyId: number,
    amountOfRoundWanted: number,
    themes?: number[],
  ): Promise<Round[]> {
    const roundIds = await this.getNotPlayedRoundsIds(difficultyId, amountOfRoundWanted, themes);
    if (roundIds.length < 1) return [];
    const selectedIds = this.getRandomRounds(roundIds, amountOfRoundWanted);
    this.setPlayedRounds(selectedIds);
    const rounds = await this.getRoundsByIds(selectedIds, amountOfRoundWanted);
    return rounds;
  }

  /**
   * Fetch rounds content with their ids
   */
  private async getRoundsByIds(
    selectedIds: number[],
    amountOfRoundWanted: number,
  ): Promise<Round[]> {
    const rounds = await Round.query()
      .whereIn('id', selectedIds)
      .preload('answers')
      .preload('theme')
      .limit(amountOfRoundWanted);
    return rounds;
  }

  /**
   * Take an array of rounds ids and return random ids of this array
   */
  private getRandomRounds(roundIds: Round[], amountOfRoundWanted: number) {
    const selectedIds: number[] = [];
    for (let i = 0; selectedIds.length < amountOfRoundWanted; i++) {
      if (i > roundIds.length) return selectedIds;
      const randIndex = Math.floor(Math.random() * roundIds.length);
      const randId = roundIds[randIndex].id;
      selectedIds.push(randId);
      roundIds.splice(randIndex, 1);
    }
    return selectedIds;
  }

  /**
   * Get only not played rounds ids
   */
  private async getNotPlayedRoundsIds(
    difficultyId: number,
    amountOfRoundWanted: number,
    themes?: number[],
  ) {
    const roundIds = await this.fetchAllRoundsIds(difficultyId, themes);
    // Check if we have enough roundIds
    if (roundIds.length >= amountOfRoundWanted) {
      return roundIds;
    } else {
      // All rounds have been played we need to reset the 'played' boolean
      await this.resetPlayedRounds(difficultyId, themes);
      // Fetch them again
      return this.fetchAllRoundsIds(difficultyId, themes);
    }
  }

  /**
   * Fetch all not played rounds for a given difficulty
   */
  private async fetchAllRoundsIds(difficultyId: number, themes?: number[]) {
    const request = Round.query()
      .select('id')
      .where('validated', this.isPrivate)
      .where('played', false);
    if (themes && themes.length > 0) {
      request.whereIn('theme_id', themes);
    }
    if (difficultyId !== DifficultyEnum.Random) {
      request.where('difficulty_id', difficultyId);
    }
    return request;
  }

  /**
   * Set all rounds for a given category to played = false
   */
  private async resetPlayedRounds(difficultyId: number, themes?: number[]): Promise<number[]> {
    const resetQuery = Round.query().where('validated', true).update({ played: false });
    if (difficultyId === DifficultyEnum.Random && themes && themes.length > 0) {
      resetQuery.whereIn('theme_id', themes);
    } else {
      resetQuery.where('difficulty_id', difficultyId);
    }
    return resetQuery;
  }

  /**
   * Update all given rounds to played = true
   */
  private async setPlayedRounds(roundIds: number[]) {
    return Round.query().whereIn('id', roundIds).update({ played: true });
  }
}

export default RoundFetcher;
