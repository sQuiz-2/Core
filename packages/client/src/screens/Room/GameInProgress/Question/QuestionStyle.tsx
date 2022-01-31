import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useGameInProgressQuestionStyle() {
  const screenWidth = useScreenWidth();

  const styles = StyleSheet.create({
    infoTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    question: {
      textAlign: 'center',
      paddingVertical: responsive(screenWidth, 10, 20, 40),
      userSelect: 'none',
    },
    questionCounter: {
      fontWeight: 'bold',
    },
    joinMessageContainer: {
      flex: 1,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    joinCounterContainer: {
      paddingBottom: 20,
    },
  });
  return styles;
}
