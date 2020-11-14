import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useGameEndTopScoreboardStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    imageContainer: {
      paddingVertical: 40,
    },
    image: {
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
      width: 307,
      height: 278,
    },
    topContainer: {
      maxHeight: 250,
    },
    topItem: {
      paddingHorizontal: 5,
      paddingVertical: 8,
      borderRadius: 5,
      marginVertical: 4,
    },
  });
}
