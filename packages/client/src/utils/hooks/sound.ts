import { useEffect, useRef } from 'react';

import QSound, { CreateSound } from '../sound';

export function useSound(soundParams: CreateSound) {
  const sound = useRef(new QSound(soundParams)).current;

  useEffect(() => {
    return () => {
      sound.unload();
    };
  }, []);

  return sound;
}
