import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useStreamStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    scrollView: {
      maxHeight: 340,
    },
    streamsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    streamCard: {
      paddingBottom: responsive(screenWidth, 10, 10, 4),
      paddingHorizontal: responsive(screenWidth, 5, 5, 2),
    },
    image: {
      width: 180,
      height: 101,
    },
  });
}
