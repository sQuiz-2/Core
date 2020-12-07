import { Difficulties } from '@squiz/shared';
import { useMemo } from 'react';

export default function useDifficulties() {
  const difficulties = useMemo(
    (): { id: number; title: string }[] => Difficulties.map(({ id, title }) => ({ id, title })),
    []
  );
  return difficulties;
}
