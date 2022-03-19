import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useTrophyStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    title: {
      fontWeight: 'bold',
    },
    description: {
      fontStyle: 'italic',
    },
    textContainer: {
      flexDirection: 'column',
      minWidth: 300,
      width: responsive(screenWidth, 200, 300, 400),
    },
  });
}
