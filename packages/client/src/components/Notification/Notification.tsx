import React, { useEffect, useRef } from 'react';
import { View, Image, ImageSourcePropType, Animated, Easing } from 'react-native';

import Card from '../Card';
import Text from '../Text';
import useNotificationStyle from './NotificationStyle';

type NotificationProps = {
  title: string;
  image: ImageSourcePropType;
  children: React.ReactNode;
  duration: number | undefined;
};

export default function Notification({ title, image, children, duration }: NotificationProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const styles = useNotificationStyle();

  function inEffect() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }

  function outEffect() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    inEffect();
    if (duration) {
      setTimeout(outEffect, duration - 300);
    }
  }, [opacity]);

  return (
    <Animated.View style={[{ opacity }, styles.animatedContainer]}>
      <Card>
        <View style={styles.container}>
          <Image source={image} style={styles.picture} />
          <View style={styles.textContainer}>
            <Text fontFamily="title" fontSize="xl">
              {title}
            </Text>
            {children}
          </View>
        </View>
      </Card>
    </Animated.View>
  );
}
