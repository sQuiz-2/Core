import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useProfileStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    containerAvatar: {
      paddingTop: 40,
      width: responsive(screenWidth, '90%', '80%', '70%'),
      maxWidth: 1300,
    },
    containerBadge: {
      paddingTop: 40,
      paddingBottom: 40,
      width: responsive(screenWidth, '90%', '80%', '70%'),
      maxWidth: 1300,
    },
    disconnectContainer: {
      marginTop: 40,
      marginBottom: 40,
    },
  });
}
