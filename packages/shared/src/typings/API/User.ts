export type GetUsers = {
  id: number;
  email: string;
}[];

export type MeBasic = {
  experience: number;
  avatar: string;
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
