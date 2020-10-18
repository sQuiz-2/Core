import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import footerIcons from '../constant/footerIcons.json';
import Hoverable from './Hoverable';
import Text from './Text';

type CenterContainerProps = {
  enable: boolean;
};

export default function Footer({ enable }: CenterContainerProps) {
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
          <Hoverable
            key={name}
            style={[styles.button, { borderColor: colors.border }]}
            onHover={{ backgroundColor: colors.border }}
            onPress={() => openLink(url)}>
            <FontAwesome5 style={styles.icon} name={icon} size={20} color={colors.text} />
            <Text fontSize="lg">{name}</Text>
          </Hoverable>
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
