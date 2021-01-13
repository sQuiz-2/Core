import { getFromStore, setInStore, StorageEnum } from '@Src/utils/storage';
import { atom, selector } from 'recoil';

const soundVolumeState = atom<number>({
  key: 'soundVolumeState',
  default: -1,
});

const soundVolumeFromStore = selector<number>({
  key: 'soundVolumeFromStore',
  set: ({ set }, newValue) => {
    setInStore(StorageEnum.SoundVolume, newValue);
    set(soundVolumeState, newValue);
  },
  get: async ({ get }) => {
    const soundVolume = get(soundVolumeState);
    if (soundVolume !== -1) {
      return soundVolume;
    }
    const soundVolumeFromStore = await getFromStore<number>(StorageEnum.SoundVolume);
    if (!soundVolumeFromStore) {
      return 1;
    }
    return soundVolumeFromStore;
  },
});

export default soundVolumeState;
export { soundVolumeFromStore };
