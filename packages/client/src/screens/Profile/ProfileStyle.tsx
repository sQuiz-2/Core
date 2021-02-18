import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useProfileStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      paddingTop: 40,
      alignItems: 'center',
    },
    containerAvatar: {
      width: responsive(screenWidth, '90%', '80%', '70%'),
      maxWidth: 1300,
    },
  });
}
