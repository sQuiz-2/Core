import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import NavItems from '../../constant/navBar.json';
import { Context } from '../../navigation/HomeStack';
import Hoverable from '../Hoverable';
import Text from '../Text';

type Props = {
  currentName: string;
  context: Context;
};

export default function NavBar({ currentName, context }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const navItems = NavItems[context];

  function handlePress(route: string) {
    navigation.navigate(route);
  }

  return (
    <View style={styles.container}>
      {navItems.map(({ name, icon, route }) => {
        const bgColor = route === currentName ? colors.border : colors.primary;
        return (
          <Hoverable
            key={name}
            style={[styles.navItem, { borderColor: colors.border, backgroundColor: bgColor }]}
            onHover={{ backgroundColor: colors.border }}
            onPress={() => handlePress(route)}>
            <FontAwesome5 name={icon} size={20} color={colors.text} />
            <Text fontFamily="title" fontSize="xl" style={styles.navText}>
              {name}
            </Text>
          </Hoverable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -30,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    paddingHorizontal: '1rem',
    paddingVertical: '.25rem',
    marginRight: '1.5rem',
    backgroundColor: 'transparent',
  },
  navText: {
    marginLeft: '.5rem',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
