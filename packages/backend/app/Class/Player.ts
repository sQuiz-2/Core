import { GameRank, EmitScoreDetails } from '@squiz/shared';

type Props = {
  name: string;
  id: string;
  isGuess: boolean;
  position: number;
  staff: boolean;
  dbId?: number;
  avatar?: string;
  badge?: string;
};

export default class Player {
  /**
   * Unique socket id
   */
  id: string;

  /**
   * Player database id
   */
  dbId: number | undefined;

  /**
   * Player name
   */
  name: string;

  /**
   * Player score during this game
   */
  score: number = 0;

  /**
   * Number of answered questions without failure aka streak
   */
  streak: number = 0;

  /**
   * Boolean to allow or disallow the player to answer
   */
  canGuess: boolean = true;

  /**
   * Number of guess made during a round
   */
  numberOfGuess: number = 0;

  /**
   * Did the player found the answer
   */
  find: boolean = false;

  /**
   * All ranks obtained during a game
   */
  ranks: number[] = Array(15).fill(GameRank.RoundComing);

  /**
   * Rank obtained during the round
   */
  currentRank: number = GameRank.RoundComing;

  /**
   * Player is connected or not ?
   */
  disconnected: boolean = false;

  /**
   * Player is guess or not (connected with oauth or not)
   */
  isGuess: boolean = false;

  /**
   * Player computed position
   */
  position: number = 0;

  /**
   * Boolean to check if the player is a staff member
   */
  staff: boolean = false;

  /**
   * Current game experience
   */
  experience: number = 0;

  /**
   * The player tried to answer during this game ?
   */
  triedToAnswer: boolean = false;

  avatar: string = '0';
  badge: string = '0';

  /**
   * If the player answer correctly we save the time between his answer and when the question was emit
   */
  timeToAnswer: number = 15;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.isGuess = props.isGuess;
    this.position = props.position;
    this.staff = props.staff;
    this.dbId = props.dbId;
    this.avatar = props.avatar || '0';
    this.badge = props.badge || '0';
  }

  /**
   * Check if the player can perform an answer
   */
  public canPerformGuess(maxGuess: number): boolean {
    return this.canGuess && this.numberOfGuess < maxGuess;
  }

  /**
   * Decrement the number of allowed guesses
   */
  public performInvalidAnswer(): void {
    this.numberOfGuess++;
  }

  /**
   * Compute player score
   */
  public performsValidAnswer(
    rank: number,
    roundNumber: number,
    timeToAnswer: number,
  ): EmitScoreDetails {
    let additionalPoints: number = 0;
    switch (rank) {
      case GameRank.First: {
        additionalPoints = 3;
        break;
      }
      case GameRank.Second: {
        additionalPoints = 2;
        break;
      }
      case GameRank.Third: {
        additionalPoints = 1;
        break;
      }
    }
    // Store rank of this round
    this.setRank(rank, roundNumber);
    // We limit the streak at 5
    if (this.streak < 5) {
      this.streak++;
    }
    // default score is 4 points
    this.score += 4 + this.streak + additionalPoints;
    this.find = true;
    this.canGuess = false;

    this.timeToAnswer = timeToAnswer / 1000;

    return { streak: this.streak, position: additionalPoints };
  }

  /**
   * Reset values persisting across rounds
   */
  public resetForNewGame(): void {
    this.score = 0;
    this.streak = 0;
    this.find = false;
    this.ranks = Array(15).fill(GameRank.RoundComing);
    this.position = 1;
    this.experience = 0;
    this.triedToAnswer = false;
  }

  /**
   * Reset player with initial values
   */
  public resetForNewRound(): void {
    this.currentRank = GameRank.RoundComing;
    this.canGuess = true;
    this.numberOfGuess = 0;
    // If the answer was not found, we reset the streak counter
    if (!this.find) {
      this.streak = 0;
    }
    this.find = false;
    this.timeToAnswer = 15;
  }

  /**
   * Update player find status
   */
  public setFind(find: boolean) {
    if (this.find === !find) {
      this.find = find;
    }
  }

  /**
   * Update player rank for the current round
   */
  setRank(rank: GameRank, roundsCounter: number) {
    this.ranks[roundsCounter] = rank;
    this.currentRank = rank;
  }

  /**
   * Check if the player answer correctly to the current round
   */
  public didAnswerCorrectly(): boolean {
    return this.currentRank !== GameRank.NotAnswered;
  }

  /**
   * Update disconnected prop to true
   */
  public disconnect(): void {
    this.disconnected = true;
  }

  /**
   * Update disconnected prop to false and
   * update player id
   */
  public reconnect(id: string): void {
    this.disconnected = false;
    this.id = id;
  }

  /**
   * Compute the experience for each ranks
   */
  private computeRankExperience(): number {
    const rankExperience = this.ranks.reduce((acc, rank) => {
      if (rank > GameRank.Third) return acc + 1;
      switch (rank) {
        case GameRank.First: {
          return acc + 8;
        }
        case GameRank.Second: {
          return acc + 5;
        }
        case GameRank.Third: {
          return acc + 3;
        }
        default:
          return acc;
      }
    }, 0);
    return rankExperience || 0;
  }

  /**
   * Compute the experience in therms of the player position
   */
  private computePositionExperience(): number {
    switch (this.position) {
      case GameRank.First: {
        return 50;
      }
      case GameRank.Second: {
        return 30;
      }
      case GameRank.Third: {
        return 20;
      }
    }
    return 0;
  }

  /**
   * Compute rank and position experience
   */
  public computeExperience(): number {
    const rankExperience = this.computeRankExperience();
    const positionExperience = this.computePositionExperience();
    const totalExperience = rankExperience + positionExperience;
    this.experience = totalExperience;
    return totalExperience;
  }

  public computeRoundsStats(): RoundStats {
    const roundsStats = { played: 0, correct: 0 };
    this.ranks.forEach((rank) => {
      if (rank !== GameRank.RoundComing) {
        roundsStats.played++;
        if (rank !== GameRank.NotAnswered) {
          roundsStats.correct++;
        }
      }
    });
    return roundsStats;
  }

  public gameStats(): GameStats {
    return {
      podium: this.position <= GameRank.Third ? 1 : 0,
      win: this.position === GameRank.First ? 1 : 0,
    };
  }

  /**
   * Compute round stats and game stats
   */
  public computeStats(): Stats {
    const roundsStats = this.computeRoundsStats();
    const gameStats = this.gameStats();
    return { roundsStats, gameStats };
  }

  /**
   * Check if the player was here during all the rounds
   */
  public afkAllTheGame(): boolean {
    const rank = this.ranks.find((rank) => rank !== GameRank.NotAnswered);
    return rank === undefined;
  }

  /**
   * Didn't joined at the beginning
   */
  public joinedAtTheBeginning(): boolean {
    return this.ranks[0] !== GameRank.RoundComing;
  }
}

export type GameStats = { podium: number; win: number };
export type RoundStats = { played: number; correct: number };
export type Stats = { roundsStats: RoundStats; gameStats: GameStats };
