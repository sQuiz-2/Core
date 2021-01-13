import { Audio, AVPlaybackStatus } from 'expo-av';
import { AVPlaybackSource, AVPlaybackStatusToSet } from 'expo-av/build/AV';
import { Sound } from 'expo-av/build/Audio/Sound';

export type CreateSound = {
  source: AVPlaybackSource;
  initialStatus?: AVPlaybackStatusToSet | undefined;
  onPlaybackStatusUpdate?: ((status: AVPlaybackStatus) => void) | null | undefined;
  downloadFirst?: boolean | undefined;
};
export default class QSound {
  sound: { sound: Sound; status: AVPlaybackStatus } | null = null;

  constructor(soundParams: CreateSound) {
    this.create(soundParams);
  }

  async create({ source, initialStatus, onPlaybackStatusUpdate, downloadFirst }: CreateSound) {
    try {
      this.sound = await Audio.Sound.createAsync(
        source,
        initialStatus,
        onPlaybackStatusUpdate,
        downloadFirst
      );
    } catch (e) {
      console.log('Error on sound creation: ', e);
    }
  }

  isLoaded() {
    return this.sound?.status.isLoaded;
  }

  async play(soundParams?: CreateSound) {
    // We can't play any sound :'( return
    if (!soundParams && !this.isLoaded()) return;
    // Sound is not loaded ! Let's load id
    if (soundParams && !this.isLoaded()) {
      await this.create(soundParams);
    }
    // The sound is here and loaded so let's play it !
    return this.sound?.sound.replayAsync();
  }

  async stop() {
    return this.sound?.sound.stopAsync();
  }

  async unload() {
    return this.sound?.sound.unloadAsync();
  }

  async setVolume(volume: number) {
    return this.sound?.sound.setVolumeAsync(volume);
  }
}
