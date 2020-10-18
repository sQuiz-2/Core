import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image source={require('../../../assets/icon-medium.png')} style={styles.icon} />
      <Image source={require('../../../assets/title.png')} style={styles.title} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    height: 64,
    width: 50,
    marginRight: '1rem',
  },
  title: {
    height: 48,
    width: 129,
  },
});
