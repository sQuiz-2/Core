import React from 'react';
import { StyleProp, ViewStyle, Pressable } from 'react-native';

import usePrimaryButtonStyle from './PrimaryButtonStyle';

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function PrimaryButton({ style, ...props }: ButtonProps) {
  const styles = usePrimaryButtonStyle();
  return (
    <Pressable {...props} style={[styles.button, style]}>
      {props.children}
    </Pressable>
  );
}
