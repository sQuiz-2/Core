import { StyleSheet } from 'react-native';

import { useScreenWidth } from '../../utils/hooks/screenWidth';
import responsive from '../../utils/responsive';

export default function useQuizContainerStyle() {
  const screenWidth = useScreenWidth();

  const styles = StyleSheet.create({
    container: {
      width: responsive(screenWidth, '95%', '90%', '55%'),
      alignSelf: 'center',
      flexDirection: 'row',
      paddingTop: 30,
      paddingBottom: 30,
      flexGrow: 1,
    },
    card: {
      marginBottom: 20,
    },
    scoreboard: {
      paddingRight: 0,
    },
    info: {
      flexGrow: 1,
      width: '40%',
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
    },
    game: {
      flexGrow: 1,
      justifyContent: 'space-between',
      width: '60%',
      paddingLeft: responsive(screenWidth, 0, 20, 20),
    },
    grow: {
      flexGrow: 1,
    },
  });
  return styles;
}
