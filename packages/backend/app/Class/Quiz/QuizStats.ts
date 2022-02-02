import { Difficulty, DifficultyEnum } from '@squiz/shared';
import GameStat from 'App/Models/GameStat';
import RoundStat from 'App/Models/RoundStat';

import Player, { Stats } from '../Player';

export type QuizStatsParams = {
  players: Player[];
  isPrivate: boolean;
  difficulty: Difficulty;
};

type PlayersStats = {
  id: number;
  stats: Stats;
};

type GameStatsCreate = {
  userId: number;
  win: number;
  podium: number;
  difficultyId: number;
  played: number;
};

interface GameStatsUpdate extends GameStatsCreate {
  id: number;
}

type RoundStatsCreate = {
  userId: number;
  difficultyId: number;
  correct: number;
  played: number;
};

interface RoundStatsUpdate extends RoundStatsCreate {
  id: number;
}

class QuizStats {
  isPrivate: boolean;

  difficulty: Difficulty;

  constructor(params: QuizStatsParams) {
    this.isPrivate = params.isPrivate;
    this.difficulty = params.difficulty;
  }

  public async computeAndSaveStats(players: Player[]): Promise<void> {
    if (players.length < 5 || this.difficulty.id === DifficultyEnum.Random) return;
    const playersWhoPlayedAllTheGame = players.filter((player) => player.joinedAtTheBeginning());
    const playersStats = this.computeStats(playersWhoPlayedAllTheGame);
    await this.savePlayersGameStats(playersStats);
    await this.savePlayersRoundStats(playersStats);
  }

  private async savePlayersGameStats(playersStats: PlayersStats[]): Promise<void> {
    const gameStatsToUpdate: GameStatsUpdate[] = [];
    const gameStatsToCreate: GameStatsCreate[] = [];
    const usersId = playersStats.map(({ id }) => id);

    const usersGameStats = await GameStat.query()
      .whereIn('user_id', usersId)
      .andWhere('difficulty_id', this.difficulty.id);

    playersStats.forEach(({ id, stats }) => {
      const userStats = usersGameStats.find(({ userId }) => userId === id);
      if (userStats) {
        return gameStatsToUpdate.push({
          id: userStats.id,
          userId: id,
          win: userStats.win + stats.gameStats.win,
          podium: userStats.podium + stats.gameStats.podium,
          played: userStats.played + 1,
          difficultyId: this.difficulty.id,
        });
      }
      return gameStatsToCreate.push({
        userId: id,
        win: stats.gameStats.win,
        podium: stats.gameStats.podium,
        played: 1,
        difficultyId: this.difficulty.id,
      });
    });
    await GameStat.updateOrCreateMany('id', gameStatsToUpdate);
    await GameStat.createMany(gameStatsToCreate);
  }

  private async savePlayersRoundStats(playersStats: PlayersStats[]): Promise<void> {
    const roundStatsToUpdate: RoundStatsUpdate[] = [];
    const roundStatsToCreate: RoundStatsCreate[] = [];
    const usersId = playersStats.map(({ id }) => id);

    const usersRoundStats = await RoundStat.query()
      .whereIn('user_id', usersId)
      .andWhere('difficulty_id', this.difficulty.id);

    playersStats.forEach(({ id, stats }) => {
      const userStats = usersRoundStats.find(({ userId }) => userId === id);
      if (userStats) {
        return roundStatsToUpdate.push({
          id: userStats.id,
          userId: id,
          played: userStats.played + stats.roundsStats.played,
          correct: userStats.correct + stats.roundsStats.correct,
          difficultyId: this.difficulty.id,
        });
      }
      return roundStatsToCreate.push({
        userId: id,
        played: stats.roundsStats.played,
        correct: stats.roundsStats.correct,
        difficultyId: this.difficulty.id,
      });
    });
    await RoundStat.updateOrCreateMany('id', roundStatsToUpdate);
    await RoundStat.createMany(roundStatsToCreate);
  }

  private computeStats(players: Player[]): PlayersStats[] {
    /**
     * Compute players stats
     */
    const playersStats = players.map((player) => {
      if (player.isGuess) return;
      const stats = player.computeStats();
      return { id: player.dbId, stats };
    });

    /**
     * Remove undefined elements
     */
    return playersStats.filter((player: PlayersStats | undefined): player is PlayersStats => {
      return !!player;
    });
  }
}

export default QuizStats;
