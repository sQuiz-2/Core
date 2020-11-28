import { GameRank, EmitScoreDetails } from '@squiz/shared';

type Props = {
  name: string;
  id: string;
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

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
  }

  /**
   * Check if the player can perfom an answer
   */
  public canPerformGuess(maxGuess: number): boolean {
    return this.canGuess && this.numberOfGuess < maxGuess;
  }

  /**
   * Decrement the number of allowed guesses
   */
  public performUnvalidAnswer(): void {
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
    this.ranks[roundNumber] = rank;
    this.currentRank = rank;
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
  }

  /**
   * Reset player with inital values
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
