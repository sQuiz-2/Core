import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useResponsiveContainerStyle() {
  const screenWidth = useScreenWidth();

  const styles = StyleSheet.create({
    container: {
      width: responsive(screenWidth, '95%', '90%', '75%'),
      maxWidth: 1300,
      alignSelf: 'center',
      flexDirection: 'row',
      paddingTop: 30,
      paddingBottom: 30,
      flexGrow: 1,
    },
  });
  return styles;
}
