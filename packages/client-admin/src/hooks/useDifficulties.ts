import { Difficulties } from '@squiz/shared';
import { useMemo } from 'react';

export default function useDifficulties() {
  const difficulties = useMemo(
    (): { id: number; name: string }[] => Difficulties.map(({ id, name }) => ({ id, name })),
    []
  );
  return difficulties;
}
