import Text from '@Src/components/Text';
import React from 'react';
import { Image, View } from 'react-native';

import styles from './ProfileConnectedStyle';

export default function ProfileConnected() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={require('@Assets/images/keyboard.png')} style={styles.image} />
        <Text style={styles.title}>Parties Jouées</Text>
        <Text>🚧</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('@Assets/images/tick.png')} style={styles.image} />
        <Text style={styles.title}>Taux de réussite</Text>
        <Text>🚧</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('@Assets/images/award.png')} style={styles.image} />
        <Text style={styles.title}>Trophées</Text>
        <Text>🚧</Text>
      </View>
    </View>
  );
}
