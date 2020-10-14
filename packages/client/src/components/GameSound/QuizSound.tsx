import { useEffect, useRef } from 'react';

import { useSocketListener } from '../../utils/hooks/socketListener';
import QSounds from '../../utils/sounds';

export default function QuizSound() {
  const find = useSocketListener('find', null);
  const sounds = useRef<QSounds>(new QSounds());

  async function playFindSound() {
    if (!sounds.current.isLoaded('find')) {
      await sounds.current.add('find', require('../../../assets/sounds/pop.mp3'));
    }
    sounds.current.play('find');
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line no-unused-expressions
      sounds.current.unloadAll();
      return undefined;
    };
  }, [sounds]);

  useEffect(() => {
    if (find) {
      playFindSound();
    }
  }, [find]);

  return null;
}
