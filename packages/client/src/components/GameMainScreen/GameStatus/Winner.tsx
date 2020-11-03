import React, { useEffect } from 'react';
import { StyleSheet, Platform, View } from 'react-native';

import { useSound } from '../../../utils/hooks/sound';
import Text from '../../Text';

export default function Winner({ winner }: { winner: string }) {
  const sound = useSound({ source: require('../../../../assets/sounds/game-end.mp3') });
  const fontSize = Platform.OS === 'web' ? 'xl' : 'md';

  useEffect(() => {
    sound.play();
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text fontSize={fontSize} fontFamily="title" style={styles.text}>
        {winner}
      </Text>
      <Text fontSize={fontSize} fontFamily="title" style={styles.text}>
        gagne la partie !
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    padding: Platform.OS === 'web' ? 10 : 2,
  },
});
