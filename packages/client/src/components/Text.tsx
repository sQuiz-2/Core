import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, Text as RNText } from 'react-native';
import { useTheme } from 'react-native-paper';

import { fontSizes, fontFamilies } from '../constant/theme';

type TextProps = {
  fontSize?: keyof typeof fontSizes;
  fontFamily?: keyof typeof fontFamilies;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
};

export default function Text({ style, fontSize, fontFamily, ...props }: TextProps) {
  const { colors } = useTheme();
  const size = fontSizes[fontSize ? fontSize : 'md'];
  const family = fontFamilies[fontFamily ? fontFamily : 'regular'];
  return (
    <RNText
      style={[{ fontSize: size, fontFamily: family, color: colors.text }, style]}
      {...props}
    />
  );
}
