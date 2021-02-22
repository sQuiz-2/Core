import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useGameEndTopScoreboardStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      width: '100%',
    },
    imageContainer: {
      paddingTop: 40,
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
      alignItems: 'center',
    },
    image: {
      width: 307,
      height: 278,
    },
    scroll: {
      maxHeight: 250,
      paddingRight: 10,
    },
    topContainer: {
      paddingTop: 40,
    },
  });
}
