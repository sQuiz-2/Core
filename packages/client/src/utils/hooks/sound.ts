import soundVolumeState from '@Src/global/soundVolume';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import QSound, { CreateSound } from '../sound';

export function useSound(soundParams: CreateSound) {
  const sound = useRef<null | QSound>(null);
  const volume = useRecoilValue(soundVolumeState);

  useEffect(() => {
    if (volume === -1) return;
    if (!sound.current) {
      if (!soundParams.initialStatus) {
        soundParams.initialStatus = {};
      }
      soundParams.initialStatus.volume = volume;
      sound.current = new QSound(soundParams);
    }
    sound.current.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unload();
      }
    };
  }, []);

  return sound.current;
}
