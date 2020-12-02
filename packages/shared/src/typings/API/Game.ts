import { Difficulty } from '../../enums';

export type GetGame = {
  id: number;
  title: string;
  difficultyId: number;
  available: boolean;
  createdAt: any;
  updatedAt: any;
  difficulty: Difficulty;
};

export type GetGames = GetGame[];
