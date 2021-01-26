import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function useReportModalStyle() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    question: {
      maxWidth: 500,
      paddingVertical: 20,
    },
    reason: {
      borderColor: colors.text,
      borderRadius: 8,
      borderWidth: 1,
      paddingVertical: 5,
      paddingHorizontal: 10,
      textAlign: 'center',
    },
    reasonButton: {
      marginVertical: 5,
    },
    sendButton: {
      marginTop: 20,
    },
  });
  return styles;
}
