import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useGuessesStyle() {
  const screenWidth = useScreenWidth();

  const styles = StyleSheet.create({
    container: {
      display: responsive(screenWidth, 'none', 'flex', 'flex'),
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    cardContainer: {
      flexBasis: '50%',
      flexDirection: 'row',
      padding: 2,
    },
    card: {
      backgroundColor: '#434759',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    cardLeftInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    image: {
      height: 16,
      width: 16,
    },
    guessText: {
      paddingLeft: 8,
    },
    cardRightInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textTime: {
      paddingLeft: 4,
    },
  });
  return styles;
}
