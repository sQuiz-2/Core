import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useHomeContainerStyle() {
  const screenWidth = useScreenWidth();
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
    },
    info: {
      width: responsive(screenWidth, '90%', '40%', '40%'),
      alignSelf: responsive(screenWidth, 'center', 'auto', 'auto'),
    },
    rooms: {
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
      alignItems: responsive(screenWidth, 'center', 'flex-start', 'flex-start'),
      alignContent: responsive(screenWidth, 'center', 'flex-start', 'flex-start'),
    },
    grow: {
      flexGrow: 1,
    },
    rightContainer: {
      width: responsive(screenWidth, '100%', '60%', '60%'),
      paddingLeft: responsive(screenWidth, 0, 20, 20),
    },
    title: {
      color: colors.notification,
      paddingBottom: 10,
    },
  });
}
