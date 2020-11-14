import { useTheme } from '@react-navigation/native';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';

export default function useGameEndScoreboardSwitchStyle() {
  const { colors } = useTheme();
  const switchItem: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    borderColor: colors.border,
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
  };

  return StyleSheet.create({
    container: {},
    switch: {
      flexDirection: 'row',
    },
    switchItemLeft: {
      ...switchItem,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    switchItemRight: {
      ...switchItem,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    switchText: {
      paddingLeft: 10,
    },
  });
}
