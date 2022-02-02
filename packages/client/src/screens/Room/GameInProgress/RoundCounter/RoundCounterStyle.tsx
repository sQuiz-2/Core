import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useRoundCounterStyle() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      height: 37,
      overflowY: 'scroll',
      overflowX: 'none',
    },
    medal: {
      width: 19,
      height: 27,
    },
    dot: {
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: colors.border,
    },
  });
  return styles;
}
