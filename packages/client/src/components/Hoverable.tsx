import React, { useRef } from 'react';
import {
  TouchableOpacity,
  StyleProp,
  Platform,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';

type Props = {
  onHover: StyleProp<ViewStyle>;
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
  passThrough: TouchableOpacityProps;
};

export default function Hoverable({ onHover, style, ...passThrough }: Props) {
  const ref = useRef<TouchableOpacity | null>(null);

  function setNativeProps(styles: any) {
    if (!ref.current) return;
    ref.current.setNativeProps({
      style: styles,
    });
  }

  return (
    <TouchableOpacity
      ref={(component) => (ref.current = component)}
      {...Platform.select({
        web: {
          accessibilityRole: 'link',
          onMouseEnter: () => setNativeProps(onHover),
          onMouseLeave: () => setNativeProps(style),
        },
      })}
      style={style}
      {...passThrough}
    />
  );
}
