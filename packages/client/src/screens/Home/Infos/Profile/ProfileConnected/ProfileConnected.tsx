import { LargeExperienceBar } from '@Src/components/ExperienceBar';
import Text from '@Src/components/Text';
import userBasicInfoState from '@Src/global/userBasicInfos';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './ProfileConnectedStyle';

export default function ProfileConnected() {
  const userBasicInfos = useRecoilValue(userBasicInfoState);

  return (
    <View>
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
      <View style={styles.xpBarContainer}>
        {userBasicInfos ? (
          <LargeExperienceBar experience={userBasicInfos.experience} />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
}
