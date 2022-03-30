import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useGameCardStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      flex: 1,
      width: responsive(screenWidth, '90%', 'auto', 'auto'),
    },
    gameCard: {
      marginHorizontal: responsive(screenWidth, 0, 5, 5),
      marginVertical: responsive(screenWidth, 8, 0, 0),
      padding: 0,
    },
    content: {
      paddingLeft: responsive(screenWidth, 0, 0, 20),
      paddingTop: responsive(screenWidth, 0, 0, 10),
      borderRadius: 10,
      position: 'relative',
      height: responsive(screenWidth, 100, 100, 130),
      alignItems: responsive(screenWidth, 'center', 'center', 'center'),
      justifyContent: responsive(screenWidth, 'center', 'center', 'center'),
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
