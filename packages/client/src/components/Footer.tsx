import { FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

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
      style={[styles.container, { borderTopColor: colors.text, backgroundColor: colors.primary }]}>
      <View style={styles.iconContainer}>
        {/* <FontAwesome5
          style={styles.icon}
          name="twitter"
          size={40}
          color={colors.text}
          onPress={() => openLink('https://twitter.com/M4gie_')}
        /> */}
        <FontAwesome5
          style={styles.icon}
          name="discord"
          size={40}
          color={colors.text}
          onPress={() => openLink('https://discord.gg/xari')}
        />
        <FontAwesome5
          style={styles.icon}
          name="github"
          size={40}
          color={colors.text}
          onPress={() => openLink('https://github.com/sQuiz-2')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: { paddingHorizontal: 10 },
  iconContainer: { flexDirection: 'row' },
  container: {
    borderTopWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
