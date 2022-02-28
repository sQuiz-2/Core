import { LargeExperienceBar } from '@Src/components/ExperienceBar';
import Text from '@Src/components/Text';
import userBasicInfoState from '@Src/global/userBasicInfos';
import { useNavigation } from '@react-navigation/native';
import { checkWinChallenges } from '@squiz/shared';
import React from 'react';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './ProfileConnectedStyle';

export default function ProfileConnected() {
  const userBasicInfos = useRecoilValue(userBasicInfoState);
  const navigation = useNavigation();

  const playedGames = userBasicInfos?.gameStats.reduce((acc, { played }) => acc + played, 0) || 0;
  const correctAnswers =
    userBasicInfos?.roundStats.reduce((acc, { correct }) => acc + correct, 0) || 0;
  const answers = userBasicInfos?.roundStats.reduce((acc, { played }) => acc + played, 0) || 1;
  const correctAnswersPercent = Math.floor((correctAnswers / answers) * 100);
  const winChallenge = checkWinChallenges(
    userBasicInfos?.gameStats.reduce((acc, { win }) => acc + win, 0)
  ).length;
  const completedChallenges = winChallenge + (userBasicInfos?.completedChallenges || 0);

  return (
    <View>
      <View style={styles.container}>
        <Pressable style={styles.item} onPress={() => navigation.navigate('Stats')}>
          <Image source={require('@Assets/images/keyboard.png')} style={styles.image} />
          <Text style={styles.title}>Parties Jouées</Text>
          <Text>{playedGames}</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => navigation.navigate('Stats')}>
          <Image source={require('@Assets/images/tick.png')} style={styles.image} />
          <Text style={styles.title}>Taux de réussite</Text>
          <Text>{correctAnswersPercent}%</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => navigation.navigate('Challenges')}>
          <Image source={require('@Assets/images/award.png')} style={styles.image} />
          <Text style={styles.title}>Trophées</Text>
          <Text>{completedChallenges}</Text>
        </Pressable>
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
