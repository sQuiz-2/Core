import { GameRank, EmitScoreDetails } from '@squiz/shared';

type Props = {
  name: string;
  id: string;
  isGuess: boolean;
  position: number;
};

export default class Player {
  /**
   * Unique socket id
   */
  id: string;

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

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.isGuess = props.isGuess;
    this.position = props.position;
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
  public performsValidAnswer(rank: number, roundNumber: number): EmitScoreDetails {
    let additionalPoints: number = 0;
    switch (rank) {
      case 1: {
        additionalPoints = 3;
        break;
      }
      case 2: {
        additionalPoints = 2;
        break;
      }
      case 3: {
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
}
