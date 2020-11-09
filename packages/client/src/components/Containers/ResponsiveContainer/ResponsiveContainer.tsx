import React from 'react';
import { View } from 'react-native';

import Footer from '../../Footer';
import useQuizContainerStyle from './ResponsiveContainerStyle';

type ResponsiveContainerProps = {
  footerEnable?: boolean;
  children?: React.ReactNode;
};

export default function ResponsiveContainer({
  footerEnable = false,
  children,
}: ResponsiveContainerProps) {
  const styles = useQuizContainerStyle();
  return (
    <>
      <View style={styles.container}>{children}</View>
      <Footer enable={footerEnable} />
    </>
  );
}
