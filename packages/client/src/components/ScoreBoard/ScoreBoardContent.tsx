import React from 'react';
import { ScrollView, View, StyleSheet, Image, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useSocketListener } from '../../utils/hooks/socketListener';
import Text from '../Text';

const avatars = [
  'soup_tco0pn',
  'tacos_ivvpfg',
  'mouse_ozspc2',
  'rhino_itvxcl',
  'lion_otr9q1',
  'robot_dhku5p',
  'predict_hdpujp',
  'eagle_voxbrn',
  'eyes_ovwu8y',
  'fox_zdizyq',
  'gun_axbmgk',
  'frog_rtdrex',
  'fire_pxsxia',
  'cat_bkvj6b',
  'clown_mxirma',
  'avocado_orvo7i',
  'boom_lp38og',
  'alien_vqnhob',
  '100_tupma6',
];

export default function ScoreBoardContent() {
  const players: {
    name: string;
    score: number;
    avatar: number;
    id: string;
    find: boolean;
  }[] = useSocketListener('players', []);
  const { colors } = useTheme();

  return (
    <ScrollView style={Platform.OS === 'web' && { height: '80vh' }}>
      {players.map((player) => (
        <View key={player.id} style={[styles.card, { backgroundColor: colors.primary }]}>
          <Image
            style={styles.avatar}
            source={{
              uri: `https://res.cloudinary.com/m4gie/image/upload/v1597582316/icons/${
                avatars[player.avatar ? player.avatar : 0]
              }.png`,
            }}
          />
          <Text
            fontSize="lg"
            style={[styles.pseudo, { color: player.find ? 'gold' : colors.text }]}>
            {player.name}
          </Text>
          <Text
            fontSize="lg"
            fontFamily="medium"
            style={[styles.score, { color: player.find ? 'gold' : colors.text }]}>
            {player.score}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 5,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  pseudo: {
    paddingLeft: 10,
  },
  score: {
    marginLeft: 'auto',
  },
});
