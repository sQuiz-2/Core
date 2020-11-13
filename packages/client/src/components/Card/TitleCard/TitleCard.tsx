import Text from '@Src/components/Text';
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import Card from '../Card';
import styles from './TitleCardStyle';

type HomeNewsProps = {
  title: string;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export default function TitleCard({
  title,
  children,
  containerStyle,
  contentStyle,
}: HomeNewsProps) {
  return (
    <Card style={[styles.container, containerStyle]}>
      <Text style={styles.title} fontFamily="title" fontSize="xxl">
        {title}
      </Text>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </Card>
  );
}
