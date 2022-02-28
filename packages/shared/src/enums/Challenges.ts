import DifficultyEnum from './Difficulty';

export enum ChallengeTypes {
  Point = 'point',
  Win = 'win',
  Speed = 'speed',
}

export type Challenge = {
  id: string;
  title: string;
  description: string;
  hidden: boolean;
};

export interface ChallengePoint extends Challenge {
  id: ChallengePointIds;
  requiredPoint: number;
  difficultyId: DifficultyEnum;
}

export enum ChallengePointIds {
  eightyBeginner = 'point-1',
  oneHundredBeginner = 'point-2',
  oneHundredFiftyBeginner = 'point-3',
  eightyConfirmed = 'point-4',
  oneHundredConfirmed = 'point-5',
  oneHundredFiftyConfirmed = 'point-6',
  eightyExpert = 'point-7',
  oneHundredExpert = 'point-8',
  oneHundredFiftyExpert = 'point-9',
}

export const challengePoint: ChallengePoint[] = [
  {
    id: ChallengePointIds.eightyBeginner,
    title: '80 points - Initié',
    description: 'Obtenir 80 points sur le salon initié public',
    requiredPoint: 80,
    hidden: false,
    difficultyId: DifficultyEnum.Beginner,
  },
  {
    id: ChallengePointIds.oneHundredBeginner,
    title: '100 points - Initié',
    description: 'Obtenir 100 points sur le salon initié public',
    requiredPoint: 100,
    hidden: false,
    difficultyId: DifficultyEnum.Beginner,
  },
  {
    id: ChallengePointIds.oneHundredFiftyBeginner,
    title: '150 points - Initié',
    description: 'Obtenir 150 points sur le salon initié public',
    requiredPoint: 150,
    hidden: false,
    difficultyId: DifficultyEnum.Beginner,
  },
  {
    id: ChallengePointIds.eightyConfirmed,
    title: '80 points - Confirmé',
    description: 'Obtenir 80 points sur le salon confirmé public',
    requiredPoint: 80,
    hidden: false,
    difficultyId: DifficultyEnum.Intermediate,
  },
  {
    id: ChallengePointIds.oneHundredConfirmed,
    title: '100 points - Confirmé',
    description: 'Obtenir 100 points sur le salon confirmé public',
    requiredPoint: 100,
    hidden: false,
    difficultyId: DifficultyEnum.Intermediate,
  },
  {
    id: ChallengePointIds.oneHundredFiftyConfirmed,
    title: '150 points - Confirmé',
    description: 'Obtenir 150 points sur le salon confirmé public',
    requiredPoint: 150,
    hidden: false,
    difficultyId: DifficultyEnum.Intermediate,
  },
  {
    id: ChallengePointIds.eightyExpert,
    title: '80 points - Expert',
    description: 'Obtenir 80 points sur le salon expert public',
    requiredPoint: 80,
    hidden: false,
    difficultyId: DifficultyEnum.Expert,
  },
  {
    id: ChallengePointIds.oneHundredExpert,
    title: '100 points - Expert',
    description: 'Obtenir 100 points sur le salon expert public',
    requiredPoint: 100,
    hidden: false,
    difficultyId: DifficultyEnum.Expert,
  },
  {
    id: ChallengePointIds.oneHundredFiftyExpert,
    title: '150 points - Expert',
    description: 'Obtenir 150 points sur le salon expert public',
    requiredPoint: 150,
    hidden: false,
    difficultyId: DifficultyEnum.Expert,
  },
];

export interface ChallengeStreak extends Challenge {
  id: ChallengeStreakIds;
  requiredStreak: number;
  difficultyId: DifficultyEnum;
}

export enum ChallengeStreakIds {
  fiveStreakBeginner = 'streak-1',
  tenStreakBeginner = 'streak-2',
  fifteenStreakBeginner = 'streak-3',
  fiveStreakConfirmed = 'streak-4',
  tenStreakConfirmed = 'streak-5',
  fifteenStreakConfirmed = 'streak-6',
  fiveStreakExpert = 'streak-7',
  tenStreakExpert = 'streak-8',
  fifteenStreakExpert = 'streak-9',
}

export const challengeStreak: ChallengeStreak[] = [
  {
    id: ChallengeStreakIds.fiveStreakBeginner,
    title: 'C-C-C-Combo novice',
    description: 'Répondre correctement à 5 questions successives sur le salon initié public',
    requiredStreak: 5,
    hidden: false,
    difficultyId: DifficultyEnum.Beginner,
  },
  {
    id: ChallengeStreakIds.tenStreakBeginner,
    title: 'Série de 10 questions - Initié',
    description: 'Répondre correctement à 10 questions successives sur le salon initié public',
    requiredStreak: 10,
    hidden: false,
    difficultyId: DifficultyEnum.Beginner,
  },
  {
    id: ChallengeStreakIds.fifteenStreakBeginner,
    title: 'Un parfait initié',
    description: 'Répondre correctement à 15 questions successives sur le salon initié public',
    requiredStreak: 15,
    hidden: false,
    difficultyId: DifficultyEnum.Beginner,
  },
  {
    id: ChallengeStreakIds.fiveStreakConfirmed,
    title: 'C-C-C-Combo builder',
    description: 'Répondre correctement à 5 questions successives sur le salon confirmé public',
    requiredStreak: 5,
    hidden: false,
    difficultyId: DifficultyEnum.Intermediate,
  },
  {
    id: ChallengeStreakIds.tenStreakConfirmed,
    title: 'Série de 10 questions - Confirmé',
    description: 'Répondre correctement à 10 questions successives sur le salon confirmé public',
    requiredStreak: 10,
    hidden: false,
    difficultyId: DifficultyEnum.Intermediate,
  },
  {
    id: ChallengeStreakIds.fifteenStreakConfirmed,
    title: 'Inarrêtable',
    description: 'Répondre correctement à 15 questions successives sur le salon confirmé public',
    requiredStreak: 15,
    hidden: false,
    difficultyId: DifficultyEnum.Intermediate,
  },
  {
    id: ChallengeStreakIds.fiveStreakExpert,
    title: 'C-C-C-Combo Expert',
    description: 'Répondre correctement à 5 questions successives sur le salon expert public',
    requiredStreak: 5,
    hidden: false,
    difficultyId: DifficultyEnum.Expert,
  },
  {
    id: ChallengeStreakIds.tenStreakExpert,
    title: 'Série de 10 questions - Expert',
    description: 'Répondre correctement à 10 questions successives sur le salon expert public',
    requiredStreak: 10,
    hidden: false,
    difficultyId: DifficultyEnum.Expert,
  },
  {
    id: ChallengeStreakIds.fifteenStreakExpert,
    title: 'Réponses pour un champion',
    description: 'Répondre correctement à 15 questions successives sur le salon expert public',
    requiredStreak: 15,
    hidden: false,
    difficultyId: DifficultyEnum.Expert,
  },
];

export interface ChallengeSpeed extends Challenge {
  id: ChallengeSpeedIds;
  maxTime: number;
}

export enum ChallengeSpeedIds {
  oneSec = 'speed-1',
  onePointFiveSec = 'speed-2',
}

const SECOND = 1000;

export const challengeSpeed: ChallengeSpeed[] = [
  {
    id: ChallengeSpeedIds.oneSec,
    title: 'Le Fast',
    description: "Vous avez répondu correctement à une question en moins d'une seconde",
    maxTime: SECOND * 1,
    hidden: true,
  },
  {
    id: ChallengeSpeedIds.onePointFiveSec,
    title: 'La question est vite répondue',
    description: "Vous avez répondu correctement à une question en moins d'une seconde et demi",
    maxTime: SECOND * 1.5,
    hidden: false,
  },
];

export interface ChallengeWin extends Challenge {
  id: ChallengeWinIds;
  requiredWin: number;
}

export enum ChallengeWinIds {
  oneWin = 'win-1',
  fiveWin = 'win-2',
  tenWin = 'win-3',
  fiftyWin = 'win-4',
  oneHundredWin = 'win-5',
  fiveHundredWind = 'win-6',
  oneThousandWind = 'win-7',
}

export const challengeWin: ChallengeWin[] = [
  {
    id: ChallengeWinIds.oneWin,
    title: 'Gagné gagné poulet au dîner',
    description: 'Vous avez gagné votre première partie',
    requiredWin: 1,
    hidden: true,
  },
  {
    id: ChallengeWinIds.fiveWin,
    title: 'Cinquième victoire',
    description: 'Vous avez gagné 5 parties',
    requiredWin: 5,
    hidden: false,
  },
  {
    id: ChallengeWinIds.tenWin,
    title: 'Dixième victoire',
    description: 'Vous avez gagné 10 parties',
    requiredWin: 10,
    hidden: false,
  },
  {
    id: ChallengeWinIds.fiftyWin,
    title: 'Cinquantième victoire',
    description: 'Vous avez gagné 50 parties',
    requiredWin: 50,
    hidden: false,
  },
  {
    id: ChallengeWinIds.oneHundredWin,
    title: 'Centième victoire',
    description: 'Vous avez gagné 100 parties',
    requiredWin: 100,
    hidden: false,
  },
  {
    id: ChallengeWinIds.fiveHundredWind,
    title: 'Cinq-centième victoire',
    description: 'Vous avez gagné 500 parties',
    requiredWin: 500,
    hidden: false,
  },
  {
    id: ChallengeWinIds.oneThousandWind,
    title: 'Millième victoire',
    description: 'Vous avez gagné 1000 parties',
    requiredWin: 1000,
    hidden: false,
  },
];
