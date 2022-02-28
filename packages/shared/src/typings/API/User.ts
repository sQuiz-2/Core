import { Ranks } from '../..';

export type GetUsers = {
  id: number;
  email: string;
}[];

export type MeBasic = {
  experience: number;
  avatar: string;
  badge: string;
  createdDate: string;
  rank: Ranks;
  completedChallenges: number;
  gameStats: {
    difficultyId: number;
    id: number;
    played: number;
    podium: number;
    updatedAt: any;
    createdAt: any;
    userId: number;
    win: number;
  }[];
  roundStats: {
    difficultyId: number;
    id: number;
    played: number;
    correct: number;
    updatedAt: any;
    createdAt: any;
    userId: number;
  }[];
};

export type TwitchInfo = {
  twitchId?: string;
  twitchToken?: string;
};

export type PlayerPublicInfos = {
  experience: number;
  username: string;
  game_played?: string;
  game_podium?: string;
  game_win?: string;
  round_correct?: string;
  round_played?: string;
};

export type oAuthResponse = {
  username: string;
  token: string;
  staff: boolean;
};

export type ThemeStat = {
  played: number;
  correct: number;
  title: string;
};

export type ThemeStats = {
  userStatsThemes: ThemeStat[];
  globalThemeStats: ThemeStat[];
};
