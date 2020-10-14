import { Audio, AVPlaybackStatus } from 'expo-av';
import { AVPlaybackSource, AVPlaybackStatusToSet } from 'expo-av/build/AV';
import { Sound } from 'expo-av/build/Audio/Sound';

export default class QSound {
  sound: { sound: Sound; status: AVPlaybackStatus } | null = null;

  async create(
    source: AVPlaybackSource,
    initialStatus?: AVPlaybackStatusToSet | undefined,
    onPlaybackStatusUpdate?: ((status: AVPlaybackStatus) => void) | null | undefined,
    downloadFirst?: boolean | undefined
  ) {
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

  async play() {
    return this.sound?.sound.playAsync();
  }

  async stop() {
    return this.sound?.sound.stopAsync();
  }

  async unload() {
    return this.sound?.sound.unloadAsync();
  }
}
