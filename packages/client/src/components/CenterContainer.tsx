import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import Footer from './Footer';

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
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }} {...props}>
      <View style={[styles.container, style]}>{children}</View>
      <Footer enable={footerEnable === undefined ? false : footerEnable} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
