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

export type EmitAnswer = Answer[];

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
};

export type EmitScoreboard = Player[];

export type EmitQuestions = {
  id: number;
  question: string;
  answers: string[];
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
