import { fontSizes, fontFamilies } from '@Src/constant/theme';
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 14,
  },
  input: {
    ...(Platform.OS === 'web' && { outlineWidth: 0 }),
    fontFamily: fontFamilies.text,
    fontSize: fontSizes.xxl,
    flexGrow: 1,
    minWidth: 10,
  },
  cheatText: {
    color: 'red',
  },
});

export default styles;
