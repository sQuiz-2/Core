import React, { useRef } from 'react';
import { StyleProp, Platform, ViewStyle, TouchableOpacityProps, View } from 'react-native';

interface Props extends TouchableOpacityProps {
  onHover: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export default function HoverStyle({ onHover, style, ...passThrough }: Props) {
  const ref = useRef<View | null>(null);

  function setNativeProps(styles: any) {
    if (!ref.current) return;
    ref.current.setNativeProps({
      style: styles,
    });
  }

  return (
    <View
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
