/**
 * Player object
 */

import { GameRank } from 'shared/src/enums/Game';

type Props = {
  name: string;
  id: string;
};

export default class Player {
  id: string;
  name: string;
  score: number = 0;
  streak: number = 0;
  canGuess: boolean = true;
  numberOfGuess: number = 0;
  avatar: number = 0;
  find: boolean = false;
  ranks: number[] = Array(15).fill(GameRank.RoundComing);
  currentRank: number = GameRank.RoundComing;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
  }

  public canPerformAnswer(maxGuess: number): boolean {
    return this.canGuess && this.numberOfGuess < maxGuess;
  }

  public performUnvalidAnswer(): void {
    this.numberOfGuess++;
  }

  public performsValidAnswer(rank: number, roundNumber: number) {
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

  public reset() {
    this.score = 0;
    this.streak = 0;
    this.find = false;
    this.ranks = Array(15).fill(GameRank.RoundComing);
  }

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

  public setFind(find: boolean) {
    if (this.find === !find) {
      this.find = find;
    }
  }
}
