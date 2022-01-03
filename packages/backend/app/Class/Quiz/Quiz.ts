import {
  parseAnswer,
  GameEvent,
  GameRank,
  RoomStatus,
  EmitScoreDetails,
  EmitQuestions,
  EmitQuestion,
  GameTime,
  RoomEvent,
  EmitPlayerScore,
  DifficultyEnum,
  Answer,
  TopTimeAnswer,
} from '@squiz/shared';
import Round from 'App/Models/Round';
import User from 'App/Models/User';
import { shuffle } from 'App/Utils/Array';
import { Socket } from 'socket.io';
import stringSimilarity from 'string-similarity';

import Player from '../Player';
import Room, { RoomProps } from '../Room';
import RoundFetcher from '../RoundsFetcher';
import QuizAnswerTimer from './QuizAnswerTimer';
import QuizExperience from './QuizExperience';
import QuizStats from './QuizStats';

export enum EmitterEvents {
  Start = 'start',
}

const SECOND = 1000;

export default class Quiz extends Room {
  /**
   * Minimum allowed elapsed time (in ms)
   */
  private static minElapsedTime: number = 0.7 * SECOND;

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

  constructor(props: RoomProps) {
    super(props);
    this.eventEmitter.on(EmitterEvents.Start, this.startGame.bind(this));
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
      .map(({ avatar, name, timeToAnswer, id, currentRank }) => ({
        avatar,
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
        this.quizAnswerTimer.reset();
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
    this.emitRoundEndInfos();
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
      this.eventEmitter.emit(EmitterEvents.Start);
    }
    socket.on(GameEvent.Guess, (guess) => this.playerGuess(socket, guess));
  }

  /**
   * emit endGame infos and wait for restart
   */
  private gameEnd(): void {
    // End the room and reset everyone
    this.setStatus(RoomStatus.Ended);
    this.emitAllRounds();
    this.emitCompleteScoreboard();
    if (this.checkForCheat) {
      this.quizExperience.computeAndSaveExperience(this.players);
      this.quizExperience.emitExperience(this.players);
      this.quizStats.computeAndSaveStats(this.players);
    }
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
      this.eventEmitter.emit(EmitterEvents.Start);
    } else {
      this.setStatus(RoomStatus.Waiting);
      this.deleteRoomIfPrivate();
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
  private async playerGuess(socket: Socket, guess: string): Promise<void> {
    const player = this.getPlayer(socket.id);
    if (!this.canPerformGuess(player, guess)) {
      return;
    }
    const result = stringSimilarity.findBestMatch(guess, this.currentAnswers);
    const elapsedTime = this.quizAnswerTimer.getElapsedTime();
    if (result.bestMatch.rating >= 0.8) {
      // correct answer
      if (elapsedTime < Quiz.minElapsedTime) {
        // cheat
        if (player?.dbId) {
          await User.updateOrCreate(
            {
              id: player.dbId,
            },
            { ban: true, banReason: 'Ban automatique: réponse < 0.7s' },
          );
        }
        socket.disconnect();
      } else {
        this.currentNumberOfValidAnswers++;
        this.playerGoodAnswer(player!, this.currentNumberOfValidAnswers, elapsedTime);
      }
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
    let newRounds: Round[];
    if (this.difficulty.id === DifficultyEnum.Beginner) {
      const unknownRounds = await this.roundFetcher.getRounds(DifficultyEnum.Unknown, 5);
      const beginnerRounds = await this.roundFetcher.getRounds(
        this.difficulty.id,
        15 - unknownRounds.length,
      );
      newRounds = shuffle<Round>([...unknownRounds, ...beginnerRounds]);
    } else {
      newRounds = await this.roundFetcher.getRounds(this.difficulty.id, 15);
    }
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
