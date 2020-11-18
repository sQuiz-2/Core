import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useScoreDetailStyle() {
  const screenWidth = useScreenWidth();
  const { colors } = useTheme();

  return StyleSheet.create({
    scoreDetails: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: colors.card,
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    image: {
      height: 64,
      width: 64,
    },
    scoreText: {
      fontWeight: 'bold',
    },
  });
}
