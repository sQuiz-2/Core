import { AVPlaybackSource, AVPlaybackStatusToSet, AVPlaybackStatus } from 'expo-av/build/AV';

import QSound from './sound';

export default class QSounds {
  sounds: { [key: string]: QSound } = {};

  async add(
    key: string,
    source: AVPlaybackSource,
    initialStatus?: AVPlaybackStatusToSet | undefined,
    onPlaybackStatusUpdate?: ((status: AVPlaybackStatus) => void) | null | undefined,
    downloadFirst?: boolean | undefined
  ) {
    const questionSound = new QSound();
    await questionSound.create(source, initialStatus, onPlaybackStatusUpdate, downloadFirst);
    this.sounds[key] = questionSound;
  }

  isLoaded(key: string) {
    if (this.sounds[key] && this.sounds[key].isLoaded()) {
      return true;
    }
    return false;
  }

  async play(key: string) {
    await this.sounds[key].play();
  }

  async remove(key: string) {
    await this.unload(key);
    delete this.sounds[key];
  }

  async unload(key: string) {
    await this.sounds[key].unload();
  }

  async unloadAll() {
    for (const key in this.sounds) {
      await this.unload(key);
    }
  }
}
