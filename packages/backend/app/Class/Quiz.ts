/**
 * Quizz game object
 */

import Answer from 'App/Models/Answer';
import Round from 'App/Models/Round';
import { GameEvent } from 'shared/src/enums/Game';
import { RoomStatus } from 'shared/src/enums/Room';
import { Socket } from 'socket.io';
import stringSimilarity from 'string-similarity';

import Player from './Player';
import Room from './Room';

export default class Quiz extends Room {
  answers: string[] = [];
  answerTimer: NodeJS.Timeout | null = null;
  currentNumberOfValidAnswers: number = 0;
  displayAnswers: { answer: string; prefix: null | string }[] = [];
  isGuessTime: boolean = false;
  currentRound: Round | null = null;
  rounds: Round[] = [];
  roundsCounter: number = 0;
  roundTimer: NodeJS.Timeout | null = null;

  /**
   * playerGoodAnswer:
   * Add points to a player and update the scoreboard
   */

  private playerGoodAnswer(player: Player, rank: number) {
    player.performsValidAnswer(rank);
    this.emitToSocket('find', { status: 'gg' }, player.id);
    this.emitScoreBoard();
  }

  private playerWrongAnswer(player: Player) {
    player.performUnvalidAnswer();
  }

  /**
   * emitAnswer:
   * Emit the answer to players
   */

  private emitAnswer() {
    this.emit(GameEvent.Answer, this.displayAnswers);
  }

  /**
   * emitRound:
   * Fetch rounds if needed and send it to players
   */

  private async emitRound() {
    if (this.rounds.length <= 0) {
      await this.pullRandomRounds();
    }
    const newRound = this.rounds.shift();
    if (newRound) {
      this.currentRound = newRound;
      this.emit(GameEvent.Question, {
        question: this.currentRound.question,
        maxRound: 15,
        currentRound: this.roundsCounter,
        theme: this.currentRound.theme.title,
      });
      this.answers = newRound.answers.map((answer: Answer) => answer.answer.toLowerCase());
      this.displayAnswers = newRound.answers;
    }
  }

  /**
   * emitRoundCounter:
   * Emit the rounds counters to players
   */

  private emitRoundCounter() {
    this.emit(GameEvent.RoundCounter, { total: 15, current: this.roundsCounter });
  }

  private gameLoop() {
    this.resetRoom();
    this.setStatus(RoomStatus.Starting);
    // Be prepared. Loading time before the game starts
    this.roundTimer = global.setInterval(() => {
      this.setStatus(RoomStatus.InProgress);
      if (this.roundsCounter >= this.rounds.length) {
        this.finishRound();
      } else {
        this.handleRound();
      }
    }, 20 * 1000);
  }

  public gameStop() {
    if (this.roundTimer) {
      clearInterval(this.roundTimer);
    }
    if (this.answerTimer) {
      clearInterval(this.answerTimer);
    }
  }

  // getTopPlayerss will return the list of players having the maximum score.
  private getTopPlayers(): Player[] | null {
    let topPlayers: Player[] = [];
    let maxScore: number = -1;
    if (this.players.length > 0) {
      this.players.forEach((player) => {
        if (player.score > maxScore) {
          topPlayers = [player];
          maxScore = player.score;
        } else if (player.score === maxScore) {
          topPlayers.push(player);
        }
      });
      return topPlayers;
    }
    return null;
  }

  private handleRound() {
    this.currentNumberOfValidAnswers = 0;
    this.isGuessTime = true;
    this.emitRound();
    this.emitScoreBoard();
    this.answerTimer = global.setTimeout(() => {
      this.isGuessTime = false;
      this.roundsCounter++;
      this.emitRoundCounter();
      // Reset each player attributes to make them ready for the next round
      this.resetPlayersForNewRound();
      this.emitAnswer();
    }, 15 * 1000);
  }

  private finishRound() {
    // Send winners to the frontend for everyone
    const topPlayers = this.getTopPlayers();
    const topPlayerNames: string[] = [];
    if (topPlayers !== null) {
      topPlayers.forEach((player) => {
        topPlayerNames.push(player.name);
      });
    }
    this.emit(GameEvent.Winner, topPlayerNames);

    // End the room and reset everyone
    this.setStatus(RoomStatus.Ended);
    if (this.roundTimer) {
      clearInterval(this.roundTimer);
    }

    // After 10 Seconds, reset everyone and the room. Be ready for the next round
    global.setTimeout(() => {
      this.resetPlayers();
      this.emitScoreBoard();
      this.resetRoom();
      this.setStatus(RoomStatus.Waiting);
      this.event.emit(GameEvent.Start);
    }, 10 * 1000);
  }

  public initGame() {
    this.pullRandomRounds();
    this.resetRoom();
    this.resetPlayers();
    this.event.on(GameEvent.Start, () => this.gameLoop());
  }

  private playerGuess(id: string, guess: string) {
    const player = this.getPlayer(id);
    // currentRound can be null so we check that the currentRound exists
    if (!this.currentRound) {
      console.log('Error: No current round');
      return;
    }
    if (!guess || !player || this.answers.length < 1) return;
    if (
      this.isGuessTime === false ||
      player.canPerformAnswer(this.currentRound!.maxNumberOfGuesses) === false
    )
      return;
    const result = stringSimilarity.findBestMatch(guess.toLowerCase(), this.answers);

    if (result.bestMatch.rating === 1) {
      // correct answer
      this.currentNumberOfValidAnswers++;
      this.playerGoodAnswer(player, this.currentNumberOfValidAnswers);
    } else if (result.bestMatch.rating >= 0.8) {
      // almost correct answer
    } else {
      // bad answer
      this.playerWrongAnswer(player);
    }
  }

  private resetPlayers() {
    this.players.forEach((player) => player.reset());
  }

  private resetRoom() {
    this.roundsCounter = 0;
    this.emitRoundCounter();
  }

  private resetPlayersForNewRound(): void {
    this.players.forEach((player) => player.resetForNewRound());
  }

  public startGame(socket: Socket) {
    this.emitStatusToSocket(socket.id);
    if (this.status === RoomStatus.Waiting && this.players.length >= 1) {
      this.event.emit(GameEvent.Start);
    }
    socket.on(GameEvent.Guess, (guess) => this.playerGuess(socket.id, guess));
  }

  private async pullRandomRounds() {
    const rounds = await Round.query()
      .where('validated', true)
      .where('difficulty_id', this.difficulty.id)
      .preload('answers')
      .preload('theme');
    const selectRounds: Round[] = [];
    for (let i = 0; i < 100 && rounds.length > 0; i++) {
      const rand = Math.floor(Math.random() * rounds.length);
      selectRounds.push(rounds[rand]);
      rounds.splice(rand, 1);
    }
    this.rounds = selectRounds;
  }
}
