import { Difficulty } from '../enums/Difficulty';

export type EmitRoom = {
  title: string;
  difficulty: Difficulty;
  id: string;
  players: number;
};
