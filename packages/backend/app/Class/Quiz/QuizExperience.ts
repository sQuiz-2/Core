import User from 'App/Models/User';

import Player from '../Player';

export type QuizExperienceParams = {
  players: Player[];
};

type PlayerExperience = {
  id: number;
  experience: number;
};

class QuizExperience {
  /**
   * List of players we will use to compute the experience
   */
  players: Player[];

  constructor(params: QuizExperienceParams) {
    this.players = params.players;
  }

  public computeAndSaveExperience() {
    if (this.players.length < 5) return;
    const playersExperience = this.computeExperience();
    this.savePlayersExperience(playersExperience);
  }

  private savePlayersExperience(playerExperience: PlayerExperience[]) {
    User.updateOrCreateMany('id', playerExperience);
  }

  private computeExperience(): PlayerExperience[] {
    /**
     * Compute players experience
     */
    const playersExperience = this.players.map((player) => {
      if (player.isGuess) return;
      const experience = player.computeExperience();
      return { id: player.dbId, experience };
    });

    /**
     * Remove undefined elements
     */
    return playersExperience.filter(
      (player: PlayerExperience | undefined): player is PlayerExperience => {
        return !!player;
      },
    );
  }
}

export default QuizExperience;
