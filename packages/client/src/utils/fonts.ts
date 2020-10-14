import { loadAsync } from 'expo-font';

export default async function loadFonts() {
  try {
    await loadAsync({
      ZillaSlab_400Regular: require('../../assets/fonts/ZillaSlab-Regular.ttf'),
      ZillaSlab_500Medium: require('../../assets/fonts/ZillaSlab-Medium.ttf'),
    });
  } catch (e) {
    console.warn("Can't load font: ", e?.code, e?.message);
  }
}
