/**
 * Quizz game object
 */

import { Socket } from 'socket.io';
import Answer from 'squiz-api/app/Models/Answer';
import Round from 'squiz-api/app/Models/Round';
import stringSimilarity from 'string-similarity';

import Player from '../player';
import { getRandomRounds } from '../requests';
import Room, { RoomStatus } from '../rooms/room';

const enum GameEvent {
  Answer = 'answer',
  Guess = 'guess',
  Question = 'question',
  Start = 'start',
  Stop = 'stop',
  Winner = 'winner',
  RoundCounter = 'roundCounter',
}

const GAME_MAX_GUESS = 4;

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

  playerGoodAnswer = (player: Player, rank: number) => {
    player.performsValidAnswer(rank);
    this.emitToSocket('find', { status: 'gg' }, player.id);
    this.emitScoreBoard();
  };

  playerWrongAnswer = (player: Player) => {
    player.performUnvalidAnswer();
  };

  /**
   * emitAnswer:
   * Emit the answer to players
   */

  emitAnswer = () => {
    this.emit(GameEvent.Answer, this.displayAnswers);
  };

  /**
   * emitRound:
   * Fetch rounds if needed and send it to players
   */

  emitRound = async () => {
    if (this.rounds.length <= 0) {
      await this.fetchRounds();
    }
    const newRound = this.rounds.shift();
    if (newRound) {
      this.currentRound = newRound;
      this.emit(GameEvent.Question, { question: this.currentRound.question });
      this.answers = newRound.answers.map((answer: Answer) => answer.answer.toLowerCase());
      this.displayAnswers = newRound.answers;
    }
  };

  /**
   * emitRoundCounter:
   * Emit the rounds counters to players
   */

  emitRoundCounter = () => {
    this.emit(GameEvent.RoundCounter, { total: 15, current: this.roundsCounter });
  };

  /**
   * fetchRounds:
   * Fetch new random rounds
   */

  fetchRounds = async () => {
    this.rounds = await getRandomRounds([this.difficulty.id]);
  };

  gameLoop = () => {
    this.resetRoom();
    this.setStatus(RoomStatus.Starting);
    this.roundTimer = global.setInterval(() => {
      this.setStatus(RoomStatus.InProgress);
      const topPlayer = this.getTopPlayer();
      if (topPlayer && this.roundsCounter >= 15) {
        this.handleWin(topPlayer);
      } else {
        this.handleRound();
      }
    }, 20 * 1000);
  };

  gameStop = () => {
    if (this.roundTimer) {
      clearInterval(this.roundTimer);
    }
    if (this.answerTimer) {
      clearInterval(this.answerTimer);
    }
  };

  getTopPlayer = (): Player | null => {
    if (this.players.length > 0) {
      return this.players.reduce(function (prev, current) {
        return prev.score > current.score ? prev : current;
      });
    }
    return null;
  };

  handleRound = () => {
    this.currentNumberOfValidAnswers = 0;
    this.isGuessTime = true;
    this.emitRound();
    this.emitScoreBoard();
    this.answerTimer = global.setTimeout(() => {
      this.roundsCounter++;
      this.emitRoundCounter();
      this.isGuessTime = false;
      // Reset each player attributes to make them ready for the next round
      this.resetPlayersForNewRound();
      this.emitAnswer();
    }, 15 * 1000);
  };

  handleWin = (topPlayer: Player) => {
    this.setStatus(RoomStatus.Ended);
    this.emit(GameEvent.Winner, topPlayer.name);
    if (this.roundTimer) {
      clearInterval(this.roundTimer);
    }
    global.setTimeout(() => {
      this.resetPlayers();
      this.resetRoom();
      this.setStatus(RoomStatus.Waiting);
      this.event.emit(GameEvent.Start);
    }, 10 * 1000);
  };

  initGame = () => {
    this.fetchRounds();
    this.resetRoom();
    this.event.on(GameEvent.Start, () => this.gameLoop());
  };

  playerGuess = (id: string, guess: string) => {
    const player = this.getPlayer(id);
    if (!guess || !player || this.answers.length < 1) return;
    if (this.isGuessTime === false || player.canPerformAnswer(GAME_MAX_GUESS) === false) return;
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
  };

  resetPlayers = () => {
    this.players.forEach((player) => player.reset());
    this.emitScoreBoard();
  };

  resetRoom = () => {
    this.roundsCounter = 0;
    this.emitRoundCounter();
  };

  resetPlayersForNewRound = (): void => {
    this.players.forEach((player) => player.resetForNewRound());
  };

  setPlayersFind = (find: boolean): void => {
    this.players.forEach((player) => player.setFind(find));
  };

  startGame = (socket: Socket) => {
    this.emitStatusToSocket(socket.id);
    if (this.status === RoomStatus.Waiting && this.players.length >= 1) {
      this.event.emit(GameEvent.Start);
    }
    socket.on(GameEvent.Guess, (guess) => this.playerGuess(socket.id, guess));
  };
}
