import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function Button({ style, ...props }: ButtonProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { backgroundColor: props.primary ? colors.primary : colors.text },
        style,
      ]}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 2,
  },
});
