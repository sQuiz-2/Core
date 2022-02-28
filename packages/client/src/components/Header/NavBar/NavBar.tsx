import NavItems from '@Src/constant/navBar.json';
import { Context } from '@Src/navigation/HomeStack';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { HoverStyle } from '../../Hover';
import Text from '../../Text';
import useNavBarStyle from './NavBarStyle';

type Props = {
  currentName: string;
  context: Context;
};

export default function NavBar({ currentName, context }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const navItems = NavItems[context];
  const styles = useNavBarStyle();

  function handlePress(route: string) {
    navigation.navigate(route);
  }

  return (
    <View style={styles.container}>
      {navItems.map(({ name, icon, route }) => {
        const bgColor = route === currentName ? colors.border : colors.primary;
        return (
          <Pressable key={route} onPress={() => handlePress(route)}>
            <HoverStyle
              style={[styles.navItem, { backgroundColor: bgColor }]}
              onHover={{ backgroundColor: colors.border }}>
              <FontAwesome5 name={icon} size={20} color={colors.text} solid />
              {name.length > 0 && (
                <Text fontFamily="title" fontSize="xl" style={styles.navText}>
                  {name}
                </Text>
              )}
            </HoverStyle>
          </Pressable>
        );
      })}
    </View>
  );
}
