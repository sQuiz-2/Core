import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useCreateRoomStyle() {
  const { colors } = useTheme();

  return StyleSheet.create({
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 5,
    },
    radioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5,
    },
    playersNumber: {
      paddingVertical: 2,
      textAlign: 'center',
    },
    separator: {
      paddingTop: 20,
    },
    cheatBox: {
      paddingTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    createButton: {
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      marginTop: 20,
      alignSelf: 'center',
      flexDirection: 'row',
    },
    createButtonIcon: {
      marginRight: 5,
    },
  });
}
