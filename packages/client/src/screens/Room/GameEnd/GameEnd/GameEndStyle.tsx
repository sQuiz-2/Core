import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useGameEndStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
    },
    scoreboard: {
      width: responsive(screenWidth, '90%', '40%', '40%'),
      alignSelf: responsive(screenWidth, 'center', 'auto', 'auto'),
    },
    details: {
      width: responsive(screenWidth, '100%', '60%', '60%'),
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
      paddingLeft: responsive(screenWidth, 0, 20, 20),
    },
  });
}
