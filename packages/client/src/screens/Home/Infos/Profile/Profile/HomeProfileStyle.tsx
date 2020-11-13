import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useHomeProfileStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      marginBottom: responsive(screenWidth, 8, 0, 0),
    },
  });
}
