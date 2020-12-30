import Round from 'App/Models/Round';

class RoundFetcher {
  /**
   * Pull new random rounds
   */
  public async getRounds(difficultyId: number): Promise<Round[]> {
    const roundIds = await this.getNotPlayedRoundsIds(difficultyId);
    const selectedIds = this.getRandomRounds(roundIds);
    this.setPlayedRounds(selectedIds);
    const rounds = await this.getRoundsByIds(selectedIds);
    return rounds;
  }

  /**
   * Fetch rounds content with their ids
   */
  private async getRoundsByIds(selectedIds: number[]): Promise<Round[]> {
    const rounds = await Round.query()
      .whereIn('id', selectedIds)
      .preload('answers')
      .preload('theme')
      .limit(15);
    return rounds;
  }

  /**
   * Take an array of rounds ids and return random ids of this array
   */
  private getRandomRounds(roundIds: Round[]) {
    const selectedIds: number[] = [];
    for (let i = 0; selectedIds.length < 15; i++) {
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
  private async getNotPlayedRoundsIds(difficultyId: number) {
    const roundIds = await this.fetchAllRoundsIds(difficultyId);
    // Check if we have enough roundIds
    if (roundIds.length >= 15) {
      return roundIds;
    } else {
      // All rounds have been played we need to reset the 'played' boolean
      await this.resetPlayedRounds(difficultyId);
      // Fetch them again
      return this.fetchAllRoundsIds(difficultyId);
    }
  }

  /**
   * Fetch all not played rounds for a given difficulty
   */
  private async fetchAllRoundsIds(difficultyId: number) {
    const roundIds = await Round.query()
      .select('id')
      .where('validated', true)
      .where('difficulty_id', difficultyId)
      .where('played', false);
    return roundIds;
  }

  /**
   * Set all rounds for a given category to played = false
   */
  private async resetPlayedRounds(difficultyId: number): Promise<number[]> {
    return Round.query()
      .where('validated', true)
      .where('difficulty_id', difficultyId)
      .update({ played: false });
  }

  /**
   * Update all given rounds to played = true
   */
  private async setPlayedRounds(roundIds: number[]) {
    return Round.query().whereIn('id', roundIds).update({ played: true });
  }
}

export default RoundFetcher;
