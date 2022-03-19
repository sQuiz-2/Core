import Logger from '@ioc:Adonis/Core/Logger';
import {
  parseAnswer,
  GameEvent,
  GameRank,
  RoomStatus,
  EmitScoreDetails,
  EmitQuestions,
  EmitQuestion,
  RoomEvent,
  EmitPlayerScore,
  DifficultyEnum,
  Answer,
  TopTimeAnswer,
} from '@squiz/shared';
import { sortRoundsByDifficulty } from 'App/Controllers/Http/RoundsController';
import Round from 'App/Models/Round';
import { shuffle } from 'App/Utils/Array';
import { isNumeric } from 'App/Utils/Number';
import { Socket } from 'socket.io';
import stringSimilarity from 'string-similarity';
import { setTimeout as asyncSetTimeout } from 'timers/promises';

import Player from '../Player';
import Room, { RoomProps } from '../Room';
import RoundFetcher from '../RoundsFetcher';
import QuizAnswerTimer from './QuizAnswerTimer';
import QuizChallenges from './QuizChallenges';
import QuizExperience from './QuizExperience';
import QuizStats from './QuizStats';

export enum EmitterEvents {
  Init = 'init',
  Start = 'start',
  NewRound = 'newRound',
}

const SECOND = 1000;

export default class Quiz extends Room {
  /**
   * Timeout before starting a new game
   */
  timer: NodeJS.Timeout | null = null;

  /**
   * Abort controller used to send abort signal to async timers
   */
  abortController = new AbortController();

  /**
   * Rounds for the game
   */
  rounds: Round[] = [];

  /**
   * Answers for the current round
   */
  currentAnswers: string[] = [];

  /**
   * If the current answer is a number we want a perfect answer
   */
  answerNeedToBePerfect: boolean = false;

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

  /**
   * Compute and save players experience
   */
  quizExperience: QuizExperience = new QuizExperience({
    namespace: this.nameSpace,
    difficulty: this.difficulty,
  });

  /**
   * Compute elapsed time between the round start and a player answer
   */
  quizAnswerTimer: QuizAnswerTimer = new QuizAnswerTimer();

  /**
   * Compute and save players stats
   */
  quizStats: QuizStats = new QuizStats({
    players: this.players,
    isPrivate: this.isPrivate,
    difficulty: this.difficulty,
  });

  /**
   * Compute and save players challenges
   */
  quizChallenges: QuizChallenges = new QuizChallenges({
    difficulty: this.difficulty,
  });

  constructor(props: RoomProps) {
    super(props);
    this.eventEmitter.on(EmitterEvents.Init, this.initGame.bind(this));
    this.eventEmitter.on(EmitterEvents.Start, this.gameLoop.bind(this));
    this.eventEmitter.on(EmitterEvents.NewRound, this.startNewRound.bind(this));
  }

  /**
   * Compute player score and emit score updates
   */
  private playerGoodAnswer(player: Player, rank: number, elapsedTime: number): void {
    const scoreDetail: EmitScoreDetails = player.performsValidAnswer(
      rank,
      this.roundsCounter,
      elapsedTime,
    );
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
    const playerIndex = this.players.findIndex((p) => p.id === player.id);
    if (playerIndex < 21) {
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
   * Emit roundEnd information
   */
  private emitRoundEndInfos(): void {
    if (!this.currentRound) return;
    const answers: Answer[] = this.currentRound.answers.map((answer) => answer);
    const topTimeAnswer: TopTimeAnswer[] = this.players
      .filter(
        ({ currentRank }) => currentRank > GameRank.NotAnswered && currentRank <= GameRank.Third,
      )
      .map(({ avatar, badge, name, timeToAnswer, id, currentRank }) => ({
        avatar,
        badge,
        name,
        score: timeToAnswer + 's',
        id,
        position: currentRank,
      }))
      .sort((a, b) => a.position - b.position);
    this.emit(GameEvent.Answer, { answers, topTimeAnswer });
  }

  /**
   * Update ranks for players who didn't answered correctly
   */
  private updateMissingRanks(): void {
    this.players.forEach((player) => {
      if (player.currentRank === GameRank.RoundComing) {
        player.setRank(GameRank.NotAnswered, this.roundsCounter);
        const infos: EmitPlayerScore = {
          id: player.id,
          name: player.name,
          score: player.score,
          rank: player.currentRank,
          position: player.position,
          ranks: player.ranks,
          avatar: player.avatar,
          badge: player.badge,
        };
        this.emitToSocket(RoomEvent.PlayerScore, infos, player.id);
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
    const questions: EmitQuestions = this.rounds.map(({ id, question, answers, theme }) => {
      const onlyAnswers = answers.map(({ answer }) => answer);
      return { id, question, answers: onlyAnswers, theme: theme.title };
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
    if (this.currentAnswers.length === 1 && isNumeric(this.currentAnswers[0])) {
      this.answerNeedToBePerfect = true;
    } else {
      this.answerNeedToBePerfect = false;
    }
    return round;
  }

  /**
   * Check if the game is finish or not.
   * Start a new round if it's not otherwise go to gameEnd
   */
  private async startNewRound(): Promise<void> {
    if (this.status === RoomStatus.Paused) return;
    if (this.roundsCounter >= this.rounds.length) {
      this.gameEnd();
    }
    this.resetRoomForNewRound();
    const round = this.setNewCurrentRound();
    if (round) {
      this.emitCurrentRound(round);
      this.quizAnswerTimer.reset();
      try {
        await asyncSetTimeout(this.timeToAnswer * SECOND, null, {
          ref: true,
          signal: this.abortController.signal,
        });
        await this.roundEnd();
      } catch (error) {}
    }
  }

  /**
   * Handle round end
   */
  private async roundEnd(): Promise<void> {
    this.updateMissingRanks();
    this.isGuessTime = false;
    this.roundsCounter++;
    this.emitRoundEndInfos();
    this.updateStats();
    this.resetPlayersForNewRound();
    if (!this.startRoundManually) {
      try {
        await asyncSetTimeout(this.timeBetweenQuestion * SECOND, null, {
          ref: true,
          signal: this.abortController.signal,
        });
        this.eventEmitter.emit(EmitterEvents.NewRound);
      } catch (error) {}
    }
  }

  /**
   * Init a new game and run the countdown before the beginning
   */
  private async initGame(): Promise<void> {
    if (!this.startGameManually) {
      this.setStatus(RoomStatus.Starting);
      this.timer = setTimeout(
        () => this.eventEmitter.emit(EmitterEvents.Start),
        (this.timeToAnswer + this.timeBetweenQuestion) * SECOND,
      );
    }
    this.resetRoomForNewGame();
  }

  private async gameLoop(): Promise<void> {
    this.setStatus(RoomStatus.InProgress);
    this.eventEmitter.emit(EmitterEvents.NewRound);
  }

  /**
   * Start the game if needed and create event listener for guesses
   */
  public joinGame(socket: Socket): void {
    this.emitStatusToSocket(socket.id);
    // We need at least one player to start the game
    if (this.status === RoomStatus.Waiting && this.players.length >= 1) {
      this.eventEmitter.emit(EmitterEvents.Init);
    }
    socket.on(GameEvent.Guess, (guess) => this.playerGuess(socket, guess));
    if (this.startGameManually && socket.id === this.adminSocketId) {
      socket.on(GameEvent.RoomAdminStartGame, () => this.handleRoomAdminStartGame(socket));
    }
    if (this.startRoundManually && socket.id === this.adminSocketId) {
      socket.on(GameEvent.RoomAdminStartRound, () => this.handleRoomAdminStartRound(socket));
    }
    if (this.isPrivate && !this.startRoundManually && socket.id === this.adminSocketId) {
      socket.on(GameEvent.Pause, () => this.handlePauseGame(socket));
    }
  }

  /**
   * emit endGame infos and wait for restart
   */
  private async gameEnd(): Promise<void> {
    // End the room and reset everyone
    this.setStatus(RoomStatus.Ended);
    this.emitAllRounds();
    this.emitCompleteScoreboard();
    this.removeAfkPlayers();
    if (this.checkForCheat) {
      try {
        await this.quizExperience.computeAndSaveExperience(this.players);
        this.quizExperience.emitExperience(this.players);
        await this.quizStats.computeAndSaveStats(this.players, this.rounds);
      } catch (error) {
        Logger.error('Error while saving stats', error);
      }
    }

    // Time before the next game
    this.timer = setTimeout(() => this.restartGame(), this.timeBetweenGames * SECOND);

    // Save challenges
    if (!this.isPrivate && this.checkForCheat) {
      const playerChallenges = await this.quizChallenges.computeAndSaveChallenges(this.players);
      const assignPlayerChallenges = {};
      playerChallenges.forEach(({ socketId, challengeId }) => {
        if (assignPlayerChallenges[socketId]) {
          assignPlayerChallenges[socketId].push(challengeId);
        } else {
          assignPlayerChallenges[socketId] = [challengeId];
        }
      });
      Object.entries(assignPlayerChallenges).forEach(([socketId, challenges]) => {
        this.nameSpace.to(socketId).emit(GameEvent.PlayerTrophies, challenges);
      });
    }

    // Sort unknown rounds if there was unknown rounds in this game
    const unknownRoundIds = this.rounds
      .filter(({ difficultyId }) => difficultyId === DifficultyEnum.Unknown)
      .map(({ id }) => id);
    if (unknownRoundIds.length > 0) {
      await sortRoundsByDifficulty(unknownRoundIds);
    }
  }

  /**
   * remove all AFK players
   */
  private removeAfkPlayers(): void {
    this.players = this.players.filter((player) => {
      if (player.triedToAnswer === false) {
        // If the player didn't played all the game we keep the player
        const afkAllTheGame = player.afkAllTheGame();
        if (afkAllTheGame) {
          this.nameSpace.sockets[player.id]?.disconnect();
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Restart game or stop it if not enoughs sockets
   */
  private restartGame(): void {
    this.removeDisconnectedPlayers();
    this.setStatus(RoomStatus.Waiting);
    if (this.players.length > 0) {
      this.eventEmitter.emit(EmitterEvents.Init);
    } else {
      this.deleteRoomIfPrivate();
    }
  }

  /**
   * Clear all timers
   */
  public gameStop(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.abortController.abort();
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
  private async playerGuess(socket: Socket, guess: string): Promise<void> {
    const player = this.getPlayer(socket.id);
    if (!this.canPerformGuess(player, guess) || !player) {
      return;
    }
    const elapsedTime = this.quizAnswerTimer.getElapsedTime();
    let answerIsCorrect = false;
    if (this.answerNeedToBePerfect && guess === this.currentAnswers[0]) {
      answerIsCorrect = true;
    } else if (!this.answerNeedToBePerfect) {
      const result = stringSimilarity.findBestMatch(guess, this.currentAnswers);
      answerIsCorrect = result.bestMatch.rating >= 0.8;
    }
    if (answerIsCorrect) {
      // correct answer
      this.currentNumberOfValidAnswers++;
      this.playerGoodAnswer(player!, this.currentNumberOfValidAnswers, elapsedTime);
    } else {
      // bad answer
      this.playerWrongAnswer(player!);
    }
    if (!player.triedToAnswer) {
      player.triedToAnswer = true;
    }
  }

  private async handleRoomAdminStartGame(socket: Socket): Promise<void> {
    if (this.status === RoomStatus.Waiting && socket.id === this.adminSocketId) {
      this.eventEmitter.emit(EmitterEvents.Start);
    }
  }

  private async handleRoomAdminStartRound(socket: Socket): Promise<void> {
    if (socket.id === this.adminSocketId) {
      this.eventEmitter.emit(EmitterEvents.NewRound);
    }
  }

  private async handlePauseGame(socket: Socket): Promise<void> {
    if (socket.id === this.adminSocketId) {
      if (this.status === RoomStatus.Paused) {
        this.setStatus(RoomStatus.InProgress);
        this.eventEmitter.emit(EmitterEvents.NewRound);
      } else {
        this.setStatus(RoomStatus.Paused);
      }
    }
  }

  /**
   * Reset the room for a new game
   */
  private async resetRoomForNewGame(): Promise<void> {
    this.resetPlayersForNewGame();
    this.roundsCounter = 0;
    let newRounds: Round[];
    if (this.difficulty.id === DifficultyEnum.Beginner) {
      let unknownRounds: Round[] = [];
      if (this.selectedThemes.length <= 0) {
        unknownRounds = await this.roundFetcher.getRounds(DifficultyEnum.Unknown, 2);
      }
      const beginnerRounds = await this.roundFetcher.getRounds(
        this.difficulty.id,
        this.roundsToFetch - unknownRounds.length,
        this.selectedThemes,
      );
      newRounds = shuffle<Round>([...unknownRounds, ...beginnerRounds]);
    } else {
      newRounds = await this.roundFetcher.getRounds(
        this.difficulty.id,
        this.roundsToFetch,
        this.selectedThemes,
      );
    }
    this.rounds = newRounds;
    this.abortController = new AbortController();
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
