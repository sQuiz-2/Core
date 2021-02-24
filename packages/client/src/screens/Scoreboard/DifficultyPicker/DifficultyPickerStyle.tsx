import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useDifficultyPickerStyle() {
  const { colors } = useTheme();
  return StyleSheet.create({
    picker: {
      backgroundColor: colors.card,
      color: colors.text,
      height: 40,
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 5,
      paddingHorizontal: 5,
    },
  });
}
