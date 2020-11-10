import { StyleSheet } from 'react-native';

import { useScreenWidth } from '../../../utils/hooks/screenWidth';
import responsive from '../../../utils/responsive';

export default function useHomeNewsStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
      marginTop: 20,
    },
  });
}
