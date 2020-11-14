import { Context } from '@Src/navigation/HomeStack';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';

import Logo from '../Logo';
import NavBar from '../NavBar';
import Profile from '../Profile';
import useHeaderStyle from './HeaderStyle';

interface Props extends StackHeaderProps {
  context?: Context;
}

export default function Header({ context, scene }: Props) {
  const styles = useHeaderStyle();
  return (
    <View style={styles.container}>
      <View style={[styles.infoContainer]}>
        <Logo />
        <View style={styles.grow} />
        <Profile />
      </View>
      <NavBar currentName={scene.route.name} context={context ? context : 'Home'} />
    </View>
  );
}
