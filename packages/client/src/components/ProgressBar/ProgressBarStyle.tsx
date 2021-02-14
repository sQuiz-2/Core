import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useProgressBarStyle() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    progressContainer: {
      height: 18,
      width: '100%',
      backgroundColor: colors.text,
      borderRadius: 8,
    },
    progress: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: colors.background,
      borderRadius: 5,
    },
    progressText: {
      textAlign: 'center',
    },
  });
  return styles;
}
