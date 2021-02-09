import { useScreenWidth } from '@Src/utils/hooks/screenWidth';
import responsive from '@Src/utils/responsive';
import { useTheme } from '@react-navigation/native';
import { Platform, StyleSheet } from 'react-native';

export default function useJoinRoomStyle() {
  const { colors } = useTheme();
  const screenWidth = useScreenWidth();

  return StyleSheet.create({
    container: {
      marginBottom: responsive(screenWidth, 8, 0, 0),
    },
    inputContainer: {
      borderColor: colors.border,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      flexDirection: 'row',
    },
    input: {
      ...(Platform.OS === 'web' && { outlineWidth: 0 }),
      color: colors.text,
      fontSize: 20,
      width: 100,
      textAlign: 'center',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
    },
  });
}
