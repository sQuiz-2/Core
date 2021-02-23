import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useScoreboardStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    column: {
      width: responsive(screenWidth, '90%', '40%', '30%'),
      marginBottom: responsive(screenWidth, 20, 20, 0),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    bold: {
      fontWeight: 'bold',
    },
  });
}
