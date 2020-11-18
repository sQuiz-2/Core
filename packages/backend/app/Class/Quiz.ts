/**
 * Quizz game object
 */

import Round from 'App/Models/Round';
import { GameEvent } from 'shared/src/enums/Game';
import { RoomStatus } from 'shared/src/enums/Room';
import { parseAnswer } from 'shared/src/functions/Answer';
import { EmitAnswer } from 'shared/src/typings/Room';
import { Socket } from 'socket.io';
import stringSimilarity from 'string-similarity';

import Player from './Player';
import Room from './Room';

enum EventEmiter {
  Start = 'start',
}

export default class Quiz extends Room {
  answerTimer: NodeJS.Timeout | null = null;
  currentAnswers: string[] = [];
  currentNumberOfValidAnswers: number = 0;
  endTimer: NodeJS.Timeout | null = null;
  parsedAnswers: { answer: string }[] = [];
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
    this.emitToSocket(GameEvent.AnswerIsValid, { valid: true }, player.id);
    this.emitScoreBoard();
  }

  private playerWrongAnswer(player: Player) {
    player.performUnvalidAnswer();
    this.emitToSocket(GameEvent.AnswerIsValid, { valid: false }, player.id);
  }

  /**
   * emitAnswer:
   * Emit the answer to players
   */

  private emitAnswer() {
    if (!this.currentRound) return;
    const answers: EmitAnswer = this.currentRound.answers.map((answer) => answer);
    this.emit(GameEvent.Answer, answers);
  }

  /**
   * emitRound:
   * Emit new rounds to the players
   */

  private async emitRound() {
    const newRound = this.rounds[this.roundsCounter];
    if (!newRound) return;
    this.currentRound = newRound;
    this.emit(GameEvent.Question, {
      question: this.currentRound.question,
      maxRound: this.rounds.length,
      currentRound: this.roundsCounter,
      theme: this.currentRound.theme.title,
    });
    this.currentAnswers = newRound.answers.map(({ answer }) => parseAnswer(answer));
  }

  /**
   * emitRoundCounter:
   * Emit the rounds counters to the players
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
    if (this.endTimer) {
      clearInterval(this.endTimer);
    }
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
    // End the room and reset everyone
    this.setStatus(RoomStatus.Ended);
    if (this.roundTimer) {
      clearInterval(this.roundTimer);
    }

    // After 10 Seconds, Be ready for the next round
    this.endTimer = global.setTimeout(() => {
      this.setStatus(RoomStatus.Waiting);
      if (this.players.length > 0) {
        this.event.emit(EventEmiter.Start);
      }
    }, 10 * 1000);
  }

  public initGame() {
    this.event.on(EventEmiter.Start, () => this.gameLoop());
  }

  private playerGuess(id: string, guess: string) {
    const player = this.getPlayer(id);
    // currentRound can be null so we check that the currentRound exists
    if (!this.currentRound) return;
    if (!guess || !player || this.currentAnswers.length < 1) return;
    if (
      this.isGuessTime === false ||
      player.canPerformAnswer(this.currentRound!.maxNumberOfGuesses) === false
    )
      return;
    const result = stringSimilarity.findBestMatch(guess.toLowerCase(), this.currentAnswers);

    if (result.bestMatch.rating >= 0.8) {
      // correct answer
      this.currentNumberOfValidAnswers++;
      this.playerGoodAnswer(player, this.currentNumberOfValidAnswers);
    } else {
      // bad answer
      this.playerWrongAnswer(player);
    }
  }

  private resetPlayers() {
    this.players.forEach((player) => player.reset());
  }

  private resetRoom() {
    this.resetPlayers();
    this.pullRandomRounds();
    this.roundsCounter = 0;
    this.emitRoundCounter();
    this.emitScoreBoard();
  }

  private resetPlayersForNewRound(): void {
    this.players.forEach((player) => player.resetForNewRound());
  }

  public startGame(socket: Socket) {
    this.emitStatusToSocket(socket.id);
    if (this.status === RoomStatus.Waiting && this.players.length >= 1) {
      this.event.emit(EventEmiter.Start);
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
    for (let i = 0; i < 15 && rounds.length > 0; i++) {
      const rand = Math.floor(Math.random() * rounds.length);
      selectRounds.push(rounds[rand]);
      rounds.splice(rand, 1);
    }
    this.rounds = selectRounds;
  }
}
