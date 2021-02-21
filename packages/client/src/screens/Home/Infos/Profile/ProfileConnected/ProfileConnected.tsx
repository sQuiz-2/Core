import { LargeExperienceBar } from '@Src/components/ExperienceBar';
import Text from '@Src/components/Text';
import userBasicInfoState from '@Src/global/userBasicInfos';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './ProfileConnectedStyle';

export default function ProfileConnected() {
  const userBasicInfos = useRecoilValue(userBasicInfoState);

  const playedGames = userBasicInfos?.gameStats.reduce((acc, { played }) => acc + played, 0) || 0;
  const correctAnswers =
    userBasicInfos?.roundStats.reduce((acc, { correct }) => acc + correct, 0) || 0;
  const answers = userBasicInfos?.roundStats.reduce((acc, { played }) => acc + played, 0) || 1;
  const correctAnswersPercent = Math.floor((correctAnswers / answers) * 100);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.item}>
          <Image source={require('@Assets/images/keyboard.png')} style={styles.image} />
          <Text style={styles.title}>Parties Jouées</Text>
          <Text>{playedGames}</Text>
        </View>
        <View style={styles.item}>
          <Image source={require('@Assets/images/tick.png')} style={styles.image} />
          <Text style={styles.title}>Taux de réussite</Text>
          <Text>{correctAnswersPercent}%</Text>
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
