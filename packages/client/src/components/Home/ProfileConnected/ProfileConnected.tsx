import React from 'react';
import { Image, View } from 'react-native';

import Text from '../../Text';
import useProfileConnectedStyle from './ProfileConnectedStyle';

export default function ProfileConnected() {
  const styles = useProfileConnectedStyle();
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={require('../../../../assets/images/keyboard.png')} style={styles.image} />
        <Text>Partie Jouées</Text>
        <Text>🚧Bientôt🚧</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../../../assets/images/tick.png')} style={styles.image} />
        <Text>Taux de réussite</Text>
        <Text>🚧Bientôt🚧</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../../../assets/images/award.png')} style={styles.image} />
        <Text>Trophées</Text>
        <Text>🚧Bientôt🚧</Text>
      </View>
    </View>
  );
}
