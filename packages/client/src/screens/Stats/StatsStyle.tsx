import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useStatsStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    responsiveContainer: {
      flexDirection: 'column',
    },
    container: {
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: responsive(screenWidth, 'center', 'auto', 'auto'),
    },
    column: {
      width: responsive(screenWidth, '90%', '45%', '40%'),
      marginBottom: responsive(screenWidth, 20, 0, 0),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 20,
    },
    image: {
      height: 74,
      width: 74,
      marginRight: 20,
    },
    bold: {
      fontWeight: 'bold',
    },
    center: {
      textAlign: 'center',
    },
  });
}
