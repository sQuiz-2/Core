import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import Footer from '../../Footer';
import useQuizContainerStyle from './ResponsiveContainerStyle';

type ResponsiveContainerProps = {
  footerEnable?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ResponsiveContainer({
  footerEnable = true,
  style,
  children,
}: ResponsiveContainerProps) {
  const styles = useQuizContainerStyle();
  return (
    <>
      <View style={[styles.container, style]}>{children}</View>
      <Footer enable={footerEnable} />
    </>
  );
}
