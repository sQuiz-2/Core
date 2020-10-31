import { StyleSheet } from 'react-native';

import { useScreenWidth } from '../../../utils/hooks/screenWidth';
import responsive from '../../../utils/responsive';

export default function useQuestionStyle() {
  const screenWidth = useScreenWidth();

  const styles = StyleSheet.create({
    infoTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    question: {
      textAlign: 'center',
      paddingVertical: responsive(screenWidth, 10, 20, 40),
    },
    questionCounter: {
      fontWeight: 'bold',
    },
  });
  return styles;
}
