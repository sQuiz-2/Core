import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import { useScreenWidth } from '../../../utils/hooks/screenWidth';
import responsive from '../../../utils/responsive';

export default function useNavBarStyle() {
  const { colors } = useTheme();
  const screenWidth = useScreenWidth();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: responsive(screenWidth, 0, -30, -30),
    },
    navItem: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRightWidth: 2,
      borderLeftWidth: 2,
      borderTopWidth: 2,
      borderTopStartRadius: 5,
      borderTopEndRadius: 5,
      paddingHorizontal: '1rem',
      paddingVertical: '.25rem',
      /* marginRight: '1.5rem', */
      marginLeft: 15,
      backgroundColor: 'transparent',
      borderColor: colors.border,
      minHeight: 39,
    },
    navText: {
      marginLeft: '.5rem',
      textTransform: 'uppercase',
      letterSpacing: 1,
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
    },
  });
  return styles;
}
