import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useBadgeStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    pictureGray: {
      tintColor: 'gray',
    },
    opacity: {
      opacity: 0.3,
    },
    pictureAbsolute: {
      position: 'absolute',
    },
    labelContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: '53%',
      width: '10vw',
      //@ts-ignore
      transform: 'translate(-50%, -50%)',
    },
    label: {
      backgroundColor: colors.background,
      borderRadius: 5,
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lockedDescriptionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: '50%',
      width: '30vw',
      top: '50%',
      //@ts-ignore
      transform: 'translate(-50%, -50%)',
    },
    lockedDescription: {
      backgroundColor: colors.background,
      borderRadius: 5,
      paddingHorizontal: 5,
    },
  });
}