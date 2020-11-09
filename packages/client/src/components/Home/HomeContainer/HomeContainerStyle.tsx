import { StyleSheet } from 'react-native';

import { useScreenWidth } from '../../../utils/hooks/screenWidth';
import responsive from '../../../utils/responsive';

export default function useHomeContainerStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
    },
    info: {
      width: responsive(screenWidth, '90%', '40%', '40%'),
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
    },
    rooms: {
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
      width: responsive(screenWidth, '100%', '60%', '60%'),
      paddingLeft: responsive(screenWidth, 0, 20, 20),
      alignItems: responsive(screenWidth, 'center', 'flex-start', 'flex-start'),
      alignContent: responsive(screenWidth, 'center', 'flex-start', 'flex-start'),
    },
    grow: {
      flexGrow: 1,
    },
  });
}
