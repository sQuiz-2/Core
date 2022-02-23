import { TitleCard } from '@Src/components/Card';
import userState from '@Src/global/userState';
import { get } from '@Src/utils/wrappedFetch';
import {
  challengePoint,
  challengeSpeed,
  challengeStreak,
  challengeWin,
  checkWinChallenges,
  ShowChallenges,
  UnlockedChallenge,
} from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import useChallengeStyle from './ChallengesStyle';
import LockedChallenge from './LockedChallenge/LockedChallenge';

export default function Challenges() {
  const styles = useChallengeStyle();
  const user = useRecoilValue(userState);
  const [challenges, setChallenges] = useState<ShowChallenges>({
    unlockedChallenges: [] as UnlockedChallenge[],
    winnedGames: 0,
  });

  async function fetchChallenge() {
    if (!user.token) return;
    try {
      const challenges = await get<ShowChallenges>({ path: 'challenges/show', token: user.token });
      if (!challenges) return;
      setChallenges(challenges);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchChallenge();
  }, [user]);

  const unlockedChallengesId = challenges.unlockedChallenges.map(({ title }) => title);
  unlockedChallengesId.push(...checkWinChallenges(challenges.winnedGames));

  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <TitleCard title="VICTOIRES">
          <View style={styles.challengeContainer}>
            {challengeWin.map((challenge) => (
              <LockedChallenge
                key={challenge.id}
                title={challenge.title}
                description={challenge.description}
                lock={!unlockedChallengesId.includes(challenge.id)}
              />
            ))}
          </View>
        </TitleCard>
      </View>
      <View style={styles.separator}>
        <TitleCard title="RAPIDITÉ">
          <View style={styles.challengeContainer}>
            {challengeSpeed.map((challenge) => (
              <LockedChallenge
                key={challenge.id}
                title={challenge.title}
                description={challenge.description}
                lock={!unlockedChallengesId.includes(challenge.id)}
              />
            ))}
          </View>
        </TitleCard>
      </View>
      <View style={styles.separator}>
        <TitleCard title="POINTS">
          <View style={styles.challengeContainer}>
            {challengePoint.map((challenge) => (
              <LockedChallenge
                key={challenge.id}
                title={challenge.title}
                description={challenge.description}
                lock={!unlockedChallengesId.includes(challenge.id)}
              />
            ))}
          </View>
        </TitleCard>
      </View>
      <View style={styles.separator}>
        <TitleCard title="STREAK">
          <View style={styles.challengeContainer}>
            {challengeStreak.map((challenge) => (
              <LockedChallenge
                key={challenge.id}
                title={challenge.title}
                description={challenge.description}
                lock={!unlockedChallengesId.includes(challenge.id)}
              />
            ))}
          </View>
        </TitleCard>
      </View>
      <View style={styles.endPage} />
    </View>
  );
}
