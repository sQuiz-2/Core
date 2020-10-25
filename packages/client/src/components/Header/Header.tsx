import { useTheme } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Context } from '../../navigation/HomeStack';
import Logo from './Logo';
import NavBar from './NavBar';
import Profile from './Profile';

interface Props extends StackHeaderProps {
  context?: Context;
}

export default function Header({ context, scene }: Props) {
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
        <Profile />
      </View>
      <NavBar currentName={scene.route.name} context={context ? context : 'Home'} />
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
