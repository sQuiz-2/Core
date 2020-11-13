import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useGameEndScoreboardStyle() {
  const { colors } = useTheme();
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {},
  });
}
