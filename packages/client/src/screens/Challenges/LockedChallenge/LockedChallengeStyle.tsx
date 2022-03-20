import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { StyleSheet } from 'react-native';

export default function useLockedChallengeStyle() {
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      width: responsive(screenWidth, '100%', '50%', '50%'),
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
      paddingRight: 10,
    },
    textContainer: {
      paddingLeft: 5,
      flex: 1,
    },
    bold: {
      fontWeight: 'bold',
    },
    italic: {
      fontStyle: 'italic',
    },
    pictureWidth: {
      width: 30,
      height: 42,
    },
    pictureGray: {
      tintColor: 'gray',
    },
    absolute: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    opacity: {
      opacity: 0.3,
    },
    pictureAbsolute: {
      position: 'absolute',
    },
  });
}
