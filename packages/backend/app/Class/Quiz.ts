import {
  parseAnswer,
  GameEvent,
  GameRank,
  RoomStatus,
  EmitAnswer,
  EmitScoreDetails,
  EmitQuestions,
  EmitQuestion,
  GameTime,
} from '@squiz/shared';
import Round from 'App/Models/Round';
import { Socket } from 'socket.io';
import stringSimilarity from 'string-similarity';

import Player from './Player';
import Room, { RoomProps } from './Room';
import RoundFetcher from './RoundsFetcher';

enum EventEmitter {
  Start = 'start',
}

const SECOND = 1000;

export default class Quiz extends Room {
  /**
   * Used for the interval between each rounds
   */
  roundTimer: NodeJS.Timeout | null = null;

  /**
   * Timeout before emitting answer
   */
  answerTimer: NodeJS.Timeout | null = null;

  /**
   * Timeout before starting a new game
   */
  endTimer: NodeJS.Timeout | null = null;

  /**
   * Rounds for the game
   */
  rounds: Round[] = [];

  /**
   * Answers for the current round
   */
  currentAnswers: string[] = [];

  /**
   * Number of valid answers given by the sockets for the current round
   */
  currentNumberOfValidAnswers: number = 0;

  /**
   * Boolean used to allow or disallow all sockets to give a guess
   */
  isGuessTime: boolean = false;

  /**
   * Current round data
   */
  currentRound: Round | null = null;

  /**
   * Keep track of the number of rounds done
   */
  roundsCounter: number = 0;

  /**
   * Keep track of the number of rounds done
   */
  roundFetcher: RoundFetcher = new RoundFetcher();

  constructor(props: RoomProps) {
    super(props);
    this.eventEmitter.on(EventEmitter.Start, this.startGame.bind(this));
  }

  /**
   * Compute player score and emit score updates
   */
  private playerGoodAnswer(player: Player, rank: number): void {
    const scoreDetail: EmitScoreDetails = player.performsValidAnswer(rank, this.roundsCounter);
    this.sortPlayers();
    this.updatePlayersPosition();
    this.emitToSocket(
      GameEvent.ValidAnswer,
      {
        scoreDetail,
        rank: player.currentRank,
        score: player.score,
        position: player.position,
      },
      player.id,
    );
    if (player.position < 21) {
      this.emitScoreBoard();
    }
  }

  /**
   * Handle player wrong answer
   */
  private playerWrongAnswer(player: Player): void {
    player.performInvalidAnswer();
    this.emitToSocket(GameEvent.WrongAnswer, { valid: false }, player.id);
  }

  /**
   * Emit the answer to all connected sockets
   */
  private emitAnswer(): void {
    if (!this.currentRound) return;
    const answers: EmitAnswer = this.currentRound.answers.map((answer) => answer);
    this.emit(GameEvent.Answer, answers);
  }

  /**
   * Update ranks for players who didn't answered correctly
   */
  private updateMissingRanks(): void {
    this.players.forEach((player) => {
      if (player.currentRank === GameRank.RoundComing) {
        player.setRank(GameRank.NotAnswered, this.roundsCounter);
      }
    });
  }

  /**
   * Emit round to all connected sockets
   */
  private emitCurrentRound(round: Round): void {
    const emitQuestion: EmitQuestion = {
      id: round.id,
      question: round.question,
      maxRound: this.rounds.length,
      currentRound: this.roundsCounter,
      theme: round.theme.title,
      maxNumberOfGuesses: round.maxNumberOfGuesses,
    };
    this.emit(GameEvent.Question, emitQuestion);
  }

  /**
   * Emit all rounds to all connected sockets
   */
  private emitAllRounds(): void {
    const questions: EmitQuestions = this.rounds.map(({ id, question, answers }) => {
      const onlyAnswers = answers.map(({ answer }) => answer);
      return { id, question, answers: onlyAnswers };
    });
    this.emit(GameEvent.Questions, questions);
  }

  /**
   * Init a new round
   */
  private setNewCurrentRound(): Round | null {
    const round = this.rounds[this.roundsCounter];
    if (!round) return null;
    this.currentRound = round;
    this.currentAnswers = round.answers.map(({ answer }) => parseAnswer(answer));
    return round;
  }

  /**
   * Check if the game is finish or not.
   * Start a new round if it's not otherwise go to gameEnd
   */
  private startNewRound(): void {
    this.status = RoomStatus.InProgress;
    if (this.roundsCounter >= this.rounds.length) {
      this.gameEnd();
    } else {
      this.resetRoomForNewRound();
      const round = this.setNewCurrentRound();
      if (round) {
        this.emitCurrentRound(round);
      }
      // Wait the round time then send the answer
      this.answerTimer = setTimeout(() => this.roundEnd(), GameTime.Question * SECOND);
    }
  }

  /**
   * Handle round end
   */
  private roundEnd(): void {
    this.updateMissingRanks();
    this.isGuessTime = false;
    this.roundsCounter++;
    this.emitAnswer();
    this.updateStats();
    this.resetPlayersForNewRound();
  }

  /**
   * Start a new game
   */
  private startGame(): void {
    this.resetRoomForNewGame();
    this.setStatus(RoomStatus.Starting);
    this.roundTimer = setInterval(
      () => this.startNewRound(),
      (GameTime.Question + GameTime.Answer) * SECOND,
    );
  }

  /**
   * Start the game if needed and create event listener for guesses
   */
  public joinGame(socket: Socket): void {
    this.emitStatusToSocket(socket.id);
    // We need at least one player to start the game
    if (this.status === RoomStatus.Waiting && this.players.length >= 1) {
      this.eventEmitter.emit(EventEmitter.Start);
    }
    socket.on(GameEvent.Guess, (guess) => this.playerGuess(socket.id, guess));
  }

  /**
   * emit endGame infos and wait for restart
   */
  private gameEnd(): void {
    // End the room and reset everyone
    this.setStatus(RoomStatus.Ended);
    this.emitAllRounds();
    this.emitCompleteScoreboard();
    if (this.roundTimer) {
      clearInterval(this.roundTimer);
    }
    // Time before the next game
    this.endTimer = setTimeout(() => this.restartGame(), GameTime.End * SECOND);
  }

  /**
   * Restart game or stop it if not enoughs sockets
   */
  private restartGame(): void {
    this.removeDisconnectedPlayers();
    if (this.players.length > 0) {
      this.eventEmitter.emit(EventEmitter.Start);
    } else {
      this.setStatus(RoomStatus.Waiting);
    }
  }

  /**
   * Clear all timers
   */
  public gameStop(): void {
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

  /**
   * Check if perform guess is possible
   */
  private canPerformGuess(player: Player | undefined, guess: string): boolean {
    if (
      !this.currentRound ||
      !guess ||
      !player ||
      this.currentAnswers.length < 1 ||
      this.isGuessTime === false ||
      !player.canPerformGuess(this.currentRound.maxNumberOfGuesses)
    ) {
      return false;
    }
    return true;
  }

  /**
   * Handle sockets guesses
   */
  private playerGuess(id: string, guess: string): void {
    const player = this.getPlayer(id);
    if (!this.canPerformGuess(player, guess)) {
      return;
    }
    const result = stringSimilarity.findBestMatch(guess, this.currentAnswers);
    if (result.bestMatch.rating >= 0.8) {
      // correct answer
      this.currentNumberOfValidAnswers++;
      this.playerGoodAnswer(player!, this.currentNumberOfValidAnswers);
    } else {
      // bad answer
      this.playerWrongAnswer(player!);
    }
  }

  /**
   * Reset the room for a new game
   */
  private async resetRoomForNewGame(): Promise<void> {
    this.resetPlayersForNewGame();
    this.roundsCounter = 0;
    const newRounds = await this.roundFetcher.getRounds(this.difficulty.id);
    this.rounds = newRounds;
  }

  /**
   * Reset the room for a new round
   */
  private resetRoomForNewRound(): void {
    this.currentNumberOfValidAnswers = 0;
    this.isGuessTime = true;
  }

  /**
   * Update stats
   */
  private updateStats() {
    // under five players stats are not accurate
    if (this.players.length < 5) return;
    this.updateRoundStats();
  }

  /**
   * Update current round stats
   */
  private updateRoundStats(): void {
    if (!this.currentRound) return;
    const correctAnswers = this.players.reduce(
      (acc, player) => (player.didAnswerCorrectly() ? acc + 1 : acc),
      0,
    );
    const incorrectAnswers = this.players.length - correctAnswers;
    const updatedData = {
      correctAnswers: correctAnswers + this.currentRound.correctAnswers,
      incorrectAnswers: incorrectAnswers + this.currentRound.incorrectAnswers,
    };
    this.currentRound.merge(updatedData);
    // We don't really care about the result we don't need to wait for it
    this.currentRound.save();
  }
}
