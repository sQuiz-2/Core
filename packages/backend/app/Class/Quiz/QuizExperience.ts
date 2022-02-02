import { Difficulty, DifficultyEnum, GameEvent } from '@squiz/shared';
import User from 'App/Models/User';

import Player from '../Player';

export type QuizExperienceParams = {
  namespace: SocketIO.Namespace;
  difficulty: Difficulty;
};

type PlayerExperience = {
  id: number;
  experience: number;
};

class QuizExperience {
  /**
   * Namespace to emit experience
   */
  namespace: SocketIO.Namespace;

  /**
   * GameDifficulty
   */
  difficulty: Difficulty;

  constructor(params: QuizExperienceParams) {
    this.namespace = params.namespace;
    this.difficulty = params.difficulty;
  }

  public async computeAndSaveExperience(players: Player[]): Promise<void> {
    if (players.length < 5 || this.difficulty.id === DifficultyEnum.Random) return;
    const playersExperience = this.computeExperience(players);
    await this.savePlayersExperience(playersExperience);
  }

  private async savePlayersExperience(playerExperience: PlayerExperience[]): Promise<void> {
    const usersId = playerExperience.map(({ id }) => id);
    const users = await User.query().whereIn('id', usersId);
    playerExperience.forEach((player) => {
      const user = users.find(({ id }) => id === player.id);
      player.experience += user?.experience || 0;
    });
    await User.updateOrCreateMany('id', playerExperience);
  }

  private computeExperience(players: Player[]): PlayerExperience[] {
    /**
     * Compute players experience
     */
    const playersExperience = players.map((player) => {
      if (player.isGuess) return;
      const experience = player.computeExperience() * this.difficulty.xpMultiplier;
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

  public emitExperience(players: Player[]): void {
    players.forEach((player) => {
      if (player.isGuess || player.score === 0) return;
      this.namespace
        .to(player.id)
        .emit(GameEvent.GameEndPlayerInfos, { experience: player.experience });
    });
  }
}

export default QuizExperience;
