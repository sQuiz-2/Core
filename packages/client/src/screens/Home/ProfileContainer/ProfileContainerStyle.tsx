import { StyleSheet } from 'react-native';

import { useScreenWidth } from '../../../utils/hooks/screenWidth';
import responsive from '../../../utils/responsive';

export default function useProfileContainerStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      paddingBottom: 30,
      marginBottom: responsive(screenWidth, 8, 0, 0),
    },
    title: {
      fontWeight: '600',
    },
    content: {
      paddingTop: 10,
    },
  });
}
