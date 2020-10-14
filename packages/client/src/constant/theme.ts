import { DefaultTheme, configureFonts } from 'react-native-paper';
import { Fonts } from 'react-native-paper/lib/typescript/src/types';

const fonts: Fonts = {
  regular: {
    fontFamily: 'ZillaSlab_400Regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'ZillaSlab_500Medium',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'ZillaSlab_400Regular',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'ZillaSlab_400Regular',
    fontWeight: 'normal',
  },
};

const fontConfig: { web: Fonts; default: Fonts } = {
  web: fonts,
  default: fonts,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#24243E',
    accent: '#272745',
    text: '#FFF',
  },
  fonts: configureFonts(fontConfig),
};

const fontSizes = {
  sm: 16,
  md: 18,
  lg: 25,
  xl: 35,
};

const fontFamilies = {
  regular: 'ZillaSlab_400Regular',
  medium: 'ZillaSlab_500Medium',
};

export { fontSizes, fontFamilies };

export default theme;
