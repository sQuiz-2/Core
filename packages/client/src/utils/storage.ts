import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageEnum {
  User = 'sQuiz-userV2',
  SoundVolume = 'sQuiz-sound-volume',
  CustomGameConfig = 'sQuiz-custom-game-config-V2',
}

export function setInStore(key: StorageEnum, value: any) {
  const jsonValue = JSON.stringify(value);
  return AsyncStorage.setItem(key, jsonValue);
}

export async function getFromStore<T>(key: StorageEnum) {
  const value = await AsyncStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value) as T;
}

export function removeInStore(key: StorageEnum) {
  return AsyncStorage.removeItem(key);
}
