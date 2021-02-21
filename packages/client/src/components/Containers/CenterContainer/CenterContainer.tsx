import React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';

import Footer from '../../Footer';
import styles from './CenterContainerStyle';

type CenterContainerProps = {
  children: React.ReactNode;
  footerEnable?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function CenterContainer({
  style,
  children,
  footerEnable,
  ...props
}: CenterContainerProps) {
  return (
    <View style={{ flex: 1, backgroundColor: '#252C4A' }} {...props}>
      <View style={[styles.container, style]}>{children}</View>
      <Footer enable={footerEnable === undefined ? false : footerEnable} />
    </View>
  );
}
