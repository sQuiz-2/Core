import { StyleSheet } from 'react-native';

export default function useNotificationStyle() {
  return StyleSheet.create({
    animatedContainer: {
      paddingTop: 10,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    picture: {
      width: 64,
      height: 64,
    },
    textContainer: {
      flexDirection: 'column',
      paddingLeft: 20,
    },
  });
}
