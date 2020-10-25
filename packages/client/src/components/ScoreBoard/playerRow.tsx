import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Player } from '../../global/playerInfoState';
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

type Props = {
  player: Player;
};

export default function PlayerRow({ player }: Props) {
  const { colors } = useTheme();
  return (
    <View key={player.id} style={[styles.card]}>
      <Image
        style={styles.avatar}
        source={{
          uri: `https://res.cloudinary.com/m4gie/image/upload/v1597582316/icons/${
            avatars[player.avatar ? player.avatar : 0]
          }.png`,
        }}
      />
      <Text fontSize="md" style={[styles.pseudo, { color: player.find ? 'gold' : colors.text }]}>
        {player.name}
      </Text>
      <Text
        fontSize="md"
        fontFamily="title"
        style={[styles.score, { color: player.find ? 'gold' : colors.text }]}>
        {player.score}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  pseudo: {
    paddingLeft: 10,
  },
  score: {
    marginLeft: 'auto',
  },
});
