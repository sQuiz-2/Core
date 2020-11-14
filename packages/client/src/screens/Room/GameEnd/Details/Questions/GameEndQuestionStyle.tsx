import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useGameEndQuestionStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
      marginTop: 20,
      paddingRight: 0,
    },
    scroll: {
      paddingRight: 20,
      maxHeight: 300,
    },
    roundContainer: {
      paddingVertical: 10,
    },
    question: {
      fontWeight: 'bold',
    },
  });
}
