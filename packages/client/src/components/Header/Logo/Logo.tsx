import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable } from 'react-native';

import styles from './LogoStyle';

export default function Logo() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Home')} style={styles.logoContainer}>
      <Image source={require('@Assets/icons/icon.png')} style={styles.icon} />
      <Image source={require('@Assets/icons/title.png')} style={styles.title} />
    </Pressable>
  );
}
