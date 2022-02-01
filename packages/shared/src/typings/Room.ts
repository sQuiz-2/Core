import { Difficulty } from '../enums/Difficulty';

export type Room = {
  difficulty: Difficulty;
  id: string;
  players: number;
  title: string;
  isFull: boolean;
};

export type EmitRooms = Room[];

export type EmitRoomUpdate = {
  id: string;
  players: number;
  isFull: boolean;
};

export type EmitQuestion = {
  id: number;
  question: string;
  currentRound: number;
  maxRound: number;
  theme: string;
  maxNumberOfGuesses: number;
};

export type Answer = {
  answer: string;
};

export type TopTimeAnswer = {
  id: string;
  name: string;
  position: number;
  avatar: string;
  badge: string;
  score: string;
};

export type EmitRoundEndInfo = { answers: Answer[]; topTimeAnswer: TopTimeAnswer[] };

export type EmitAnswerIsValid = {
  valid: boolean;
};

export type EmitScoreDetails = {
  streak: number;
  position: number;
};

export type EmitRanks = number[];

export type Player = {
  id: string;
  name: string;
  score: number;
  rank: number;
  position: number;
  avatar?: string;
  badge?: string;
  dbId?: number;
};

export type EmitScoreboard = Player[];

export type EmitQuestions = {
  id: number;
  question: string;
  answers: string[];
  theme: string;
}[];

export type EmitValidAnswer = {
  scoreDetail: EmitScoreDetails;
  rank: number;
  score: number;
  position: number;
};

export type EmitOnlinePlayers = number;

export interface EmitPlayerScore extends Player {
  ranks?: number[];
}

export type EmitRoomInfos = {
  title: string;
  checkForCheat: boolean;
  staff: boolean;
  isPrivate: boolean;
  timeToAnswer: number;
  timeBetweenQuestion: number;
  timeBetweenGames: number;
};

export type RoomCreateConfig = {
  players: number;
  antiCheat: boolean;
  selectedDifficulty: string;
  timeToAnswer: number;
  timeBetweenQuestion: number;
  timeBetweenGames: number;
  selectedThemes: number[];
};
