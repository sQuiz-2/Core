export type Difficulty = {
  id: number;
  name: string;
  level: number;
  color: [string, string];
  xpMultiplier: number;
};

export enum DifficultyEnum {
  Beginner,
  Intermediate,
  Expert,
}

export function GetDifficultyFromId(difficulty: DifficultyEnum): Difficulty {
  switch (difficulty) {
    case DifficultyEnum.Beginner:
      return {
        id: DifficultyEnum.Beginner,
        name: 'Initié',
        level: 1,
        color: ['#a8e063', '#56ab2f'],
        xpMultiplier: 1,
      };
    case DifficultyEnum.Intermediate:
      return {
        id: DifficultyEnum.Intermediate,
        name: 'Confirmé',
        level: 1,
        color: ['#ca6642', '#da9f48'],
        xpMultiplier: 2,
      };
    case DifficultyEnum.Expert:
      return {
        id: DifficultyEnum.Expert,
        name: 'Expert',
        level: 1,
        color: ['#c04572', '#dc6747'],
        xpMultiplier: 3,
      };
  }
}
