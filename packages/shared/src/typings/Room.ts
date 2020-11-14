import { Difficulty } from '../enums/Difficulty';

export type EmitRoom = {
  title: string;
  difficulty: Difficulty;
  id: string;
  players: number;
};

export type EmitQuestion = {
  question: string;
  currentRound: number;
  maxRound: number;
  theme: string;
};

export type EmitAnswer = {
  answer: string;
};
