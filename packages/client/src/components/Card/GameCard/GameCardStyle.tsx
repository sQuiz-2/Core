import { StyleSheet } from 'react-native';

import { useScreenWidth } from '../../../utils/hooks/screenWidth';
import responsive from '../../../utils/responsive';

export default function useGameCardStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      width: responsive(screenWidth, '90%', 'auto', 'auto'),
    },
    gameCard: {
      margin: responsive(screenWidth, 8, 5, 5),
      padding: 0,
    },
    content: {
      paddingLeft: responsive(screenWidth, 0, 0, 20),
      paddingTop: responsive(screenWidth, 0, 0, 10),
      borderRadius: 10,
      position: 'relative',
      height: responsive(screenWidth, 100, 100, 130),
      alignItems: responsive(screenWidth, 'center', 'center', 'flex-start'),
      justifyContent: responsive(screenWidth, 'center', 'center', 'flex-start'),
    },
    title: {
      fontWeight: '600',
    },
    image: {
      display: responsive(screenWidth, 'none', 'none', 'flex'),
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 77,
      height: 66,
    },
  });
}
