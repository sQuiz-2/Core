import { Difficulty } from '../../enums';
import { Paginate } from './Paginate';

export type GetGame = {
  id: number;
  title: string;
  difficultyId: number;
  available: boolean;
  createdAt: any;
  updatedAt: any;
  difficulty: Difficulty;
};

export type GetGames = {
  meta: Paginate;
  data: GetGame[];
};
