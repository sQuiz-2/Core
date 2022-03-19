import soundVolumeState from '@Src/global/soundVolume';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import QSound, { CreateSound } from '../sound';

export function useSound(soundParams: CreateSound) {
  const [sound, setSound] = useState<null | QSound>(null);
  const volume = useRecoilValue(soundVolumeState);

  useEffect(() => {
    if (volume === -1) return;
    if (!sound) {
      if (!soundParams.initialStatus) {
        soundParams.initialStatus = {};
      }
      soundParams.initialStatus.volume = volume;
      setSound(new QSound(soundParams));
    } else {
      sound.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, []);

  return sound;
}
