import { useTheme } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Text from '../Text';
import Logo from './Logo';
import NavBar from './NavBar';

export default function Header({ scene }: StackHeaderProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: colors.border, backgroundColor: colors.primary },
      ]}>
      <View style={styles.infoContainer}>
        <Logo />
        <View style={{ flexGrow: 1 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{
              uri: `https://res.cloudinary.com/m4gie/image/upload/v1597582316/icons/lion_otr9q1.png`,
            }}
            style={{ borderRadius: 50, width: 40, height: 40, marginRight: 5 }}
          />
          <Text>m4gie</Text>
        </View>
      </View>
      <NavBar currentName={scene.route.name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 1, // Header component need a height to be display
    paddingTop: 2,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
  },
});
