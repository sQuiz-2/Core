import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React from 'react';
import { StyleSheet, View, Platform, Pressable } from 'react-native';

import footerIcons from '../constant/footerIcons.json';
import { HoverStyle } from './Hover';
import Text from './Text';

type FooterProps = {
  enable: boolean;
};

export default function Footer({ enable }: FooterProps) {
  const { colors } = useTheme();

  function openLink(url: string) {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  }

  if (!enable) return null;

  return (
    <View
      style={[
        styles.container,
        { borderTopColor: colors.border, backgroundColor: colors.primary },
      ]}>
      <View style={styles.buttonContainer}>
        {footerIcons.map(({ name, url, icon }) => (
          <Pressable onPress={() => openLink(url)} key={name}>
            <HoverStyle
              style={[styles.button, { borderColor: colors.border }]}
              onHover={{ backgroundColor: colors.border }}>
              <FontAwesome5 style={styles.icon} name={icon} size={20} color={colors.text} />
              <Text fontSize="lg">{name}</Text>
            </HoverStyle>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  container: {
    borderTopWidth: 2,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
