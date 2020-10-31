import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import { useScreenWidth } from '../../utils/hooks/screenWidth';
import responsive from '../../utils/responsive';
export default function useHeaderStyle() {
  const { colors } = useTheme();
  const screenWidth = useScreenWidth();

  const styles = StyleSheet.create({
    container: {
      minHeight: 1, // Header component need a height to be display
      paddingTop: 2,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: colors.border,
      backgroundColor: colors.primary,
    },
    grow: {
      flexGrow: 1,
    },
    infoContainer: {
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
      alignItems: 'center',
      width: responsive(screenWidth, '98%', '98%', '50%'),
    },
  });
  return styles;
}
