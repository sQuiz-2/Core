import { DefaultTheme } from '@react-navigation/native';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#252C4A',
    primary: '#212843',
    card: '#111421',
    border: '#204A6C',
    notification: '#43AAE0',
    text: '#FFFFFF',
  },
};

const fontSizes = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
};

const fontFamilies = {
  text: 'OpenSans',
  title: 'Oswald',
};

export { fontSizes, fontFamilies };

export default Theme;
