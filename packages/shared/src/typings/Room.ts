import { Difficulty } from '../enums/Difficulty';

export type Room = {
  title: string;
  difficulty: Difficulty;
  id: string;
  players: number;
};

export type EmitRoom = Room[];

export type EmitQuestion = {
  question: string;
  currentRound: number;
  maxRound: number;
  theme: string;
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
