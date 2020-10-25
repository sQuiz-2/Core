import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRecoilValue } from 'recoil';

import pseudoState from '../../global/pseudoState';
import Text from '../Text';

export default function Profile() {
  const pseudo = useRecoilValue(pseudoState);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://res.cloudinary.com/m4gie/image/upload/v1597582316/icons/lion_otr9q1.png`,
        }}
        style={styles.image}
      />
      <Text>{pseudo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 5,
  },
});
