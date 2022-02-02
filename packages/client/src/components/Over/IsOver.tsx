import React from 'react';
import { TouchableOpacity, Platform, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  onHover: () => void;
  onLeaveOver: () => void;
  children: React.ReactNode;
}

export default function isOver({ onHover, onLeaveOver, ...passThrough }: Props) {
  return (
    <TouchableOpacity
      {...Platform.select({
        web: {
          accessibilityRole: 'link',
          onMouseEnter: onHover,
          onMouseLeave: onLeaveOver,
        },
      })}
      {...passThrough}
    />
  );
}
