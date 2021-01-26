import { Difficulty } from '../../enums';
import { Paginate } from './Paginate';
import { GetTheme } from './Theme';

export type GetRound = {
  id: number;
  question: string;
  themeId: number;
  difficultyId: number;
  validated: boolean;
  createdAt: any;
  updatedAt: any;
  maxNumberOfGuesses: number;
  answers: {
    id: number;
    roundId: number;
    answer: string;
    createdAt: any;
    updatedAt: any;
  }[];
  theme: GetTheme;
  difficulty: Difficulty;
};

export type ReportProps = {
  id: number;
  roundId: number;
  question: number;
  answer: number;
  category: number;
};

export interface GetReportedRound extends ReportProps {
  round: GetRound;
}

export type GetRounds = {
  meta: Paginate;
  data: GetRound[];
};

export type GetReportedRounds = {
  meta: Paginate;
  data: GetReportedRound[];
};
