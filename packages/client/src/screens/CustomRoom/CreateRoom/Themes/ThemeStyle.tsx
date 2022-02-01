import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useThemeStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    themeButton: {
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 5,
      padding: 5,
      marginVertical: 2,
      marginHorizontal: 2,
      alignSelf: 'center',
      flexDirection: 'row',
    },
    themeSelected: {
      backgroundColor: colors.notification,
    },
    themeText: {
      textAlign: 'center',
      userSelect: 'none',
    },
    themeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    themeScrollView: {
      maxHeight: 130,
    },
  });
}
