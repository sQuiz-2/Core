import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useProfileStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    separator: {
      paddingTop: 40,
      width: responsive(screenWidth, '90%', '80%', '70%'),
      maxWidth: 1300,
    },
    challengeContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    endPage: {
      height: 80,
    },
  });
}
