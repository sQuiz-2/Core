import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { EmitScoreDetails } from '@squiz/shared';
import { StyleSheet } from 'react-native';

export default function useRoundEndStyle(scoreDetail: EmitScoreDetails | null) {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingBottom: 10,
      flexDirection: responsive(screenWidth, 'column', 'row', 'row'),
    },
    answer: {
      width: responsive(
        screenWidth,
        'auto',
        scoreDetail ? '60%' : '100%',
        scoreDetail ? '65%' : '100%'
      ),
    },
    scoreDetail: {
      width: responsive(screenWidth, 'auto', '40%', '35%'),
      paddingLeft: responsive(screenWidth, 0, 20, 20),
      paddingTop: responsive(screenWidth, 20, 0, 0),
    },
  });
}
