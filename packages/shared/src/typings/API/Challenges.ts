export type UnlockedChallenge = {
  id: number;
  title: string;
  createdAt: any;
  updatedAt: any;
};

export type ShowChallenges = {
  unlockedChallenges: UnlockedChallenge[];
  winnedGames: number | null;
};
