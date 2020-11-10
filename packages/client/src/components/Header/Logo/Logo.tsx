import React from 'react';
import { View, Image } from 'react-native';

import styles from './LogoStyle';

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image source={require('../../../../assets/icon-medium.png')} style={styles.icon} />
      <Image source={require('../../../../assets/title.png')} style={styles.title} />
    </View>
  );
}
