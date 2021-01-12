export type Difficulty = {
  id: number;
  title: string;
  color: [string, string];
  xpMultiplier: number;
};

enum DifficultyEnum {
  Beginner = 1,
  Intermediate = 2,
  Expert = 3,
  Unknown = 4,
}

export default DifficultyEnum;

export const Difficulties: Difficulty[] = [
  {
    id: DifficultyEnum.Beginner,
    title: 'Initié',
    color: ['#a8e063', '#56ab2f'],
    xpMultiplier: 1,
  },
  {
    id: DifficultyEnum.Intermediate,
    title: 'Confirmé',
    color: ['#ca6642', '#da9f48'],
    xpMultiplier: 2,
  },
  {
    id: DifficultyEnum.Expert,
    title: 'Expert',
    color: ['#c04572', '#dc6747'],
    xpMultiplier: 3,
  },
  {
    id: DifficultyEnum.Unknown,
    title: 'Inconnu',
    color: ['#a8e063', '#56ab2f'],
    xpMultiplier: 1,
  },
];

export function GetDifficultyFromId(difficultyId: DifficultyEnum): Difficulty {
  const difficulty = Difficulties.find((difficulty) => difficulty.id === difficultyId);
  if (!difficulty) {
    return Difficulties[0];
  }
  return difficulty;
}
