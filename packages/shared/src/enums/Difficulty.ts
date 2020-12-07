export type Difficulty = {
  id: number;
  title: string;
  level: number;
  color: [string, string];
  xpMultiplier: number;
};

enum DifficultyEnum {
  Beginner = 1,
  Intermediate = 2,
  Expert = 3,
}

export default DifficultyEnum;

export const Difficulties: Difficulty[] = [
  {
    id: DifficultyEnum.Beginner,
    title: 'Initié',
    level: 1,
    color: ['#a8e063', '#56ab2f'],
    xpMultiplier: 1,
  },
  {
    id: DifficultyEnum.Intermediate,
    title: 'Confirmé',
    level: 1,
    color: ['#ca6642', '#da9f48'],
    xpMultiplier: 2,
  },
  {
    id: DifficultyEnum.Expert,
    title: 'Expert',
    level: 1,
    color: ['#c04572', '#dc6747'],
    xpMultiplier: 3,
  },
];

export function GetDifficultyFromId(difficultyId: DifficultyEnum): Difficulty {
  const difficulty = Difficulties.find((difficulty) => difficulty.id === difficultyId);
  return difficulty!;
}
