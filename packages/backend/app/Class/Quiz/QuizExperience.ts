import { GameEvent } from '@squiz/shared';
import User from 'App/Models/User';

import Player from '../Player';

export type QuizExperienceParams = {
  players: Player[];
  namespace: SocketIO.Namespace;
};

type PlayerExperience = {
  id: number;
  experience: number;
  socketId: string;
};

class QuizExperience {
  /**
   * List of players we will use to compute the experience
   */
  players: Player[];

  /**
   * Namespace to emit experience
   */
  namespace: SocketIO.Namespace;

  constructor(params: QuizExperienceParams) {
    this.players = params.players;
    this.namespace = params.namespace;
  }

  public computeAndSaveExperience() {
    if (this.players.length < 5) return;
    const playersExperience = this.computeExperience();
    this.savePlayersExperience(playersExperience);
  }

  private async savePlayersExperience(playerExperience: PlayerExperience[]) {
    const usersId = playerExperience.map(({ id }) => id);
    const users = await User.query().whereIn('id', usersId);
    playerExperience.forEach((player) => {
      const user = users.find(({ id }) => id === player.id);
      player.experience += user?.experience || 0;
    });
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

  public emitExperience(): void {
    this.players.forEach((player) => {
      if (player.isGuess || player.score === 0) return;
      this.namespace
        .to(player.id)
        .emit(GameEvent.GameEndPlayerInfos, { experience: player.experience });
    });
  }
}

export default QuizExperience;
