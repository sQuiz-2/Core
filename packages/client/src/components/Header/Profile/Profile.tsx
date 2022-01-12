import { Level } from '@Src/components/ExperienceBar';
import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import avatars from '@Src/utils/loadAvatars';
import badges from '@Src/utils/loadBadges';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image } from 'react-native';
import { useRecoilValue } from 'recoil';

import Text from '../../Text';
import SoundVolume from '../soundVolume';
import styles from './ProfileStyle';

export default function Profile() {
  const { colors } = useTheme();
  const user = useRecoilValue(userState);
  const userBasicInfos = useRecoilValue(userBasicInfoState);

  const navigation = useNavigation();

  async function goToProfile() {
    navigation.navigate('Profile');
  }

  return (
    <View style={styles.container}>
      {user.connected && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {userBasicInfos && (
            <>
              <View style={styles.level}>
                <Level experience={userBasicInfos.experience} />
              </View>
              <Image
                source={avatars[userBasicInfos.avatar as keyof typeof avatars]}
                style={styles.avatar}
              />
              {badges[userBasicInfos.badge as keyof typeof badges] && (
                <Image
                  source={badges[userBasicInfos.badge as keyof typeof badges]}
                  style={styles.avatar}
                />
              )}
            </>
          )}
          <Text>{user.username}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
        <SoundVolume />
        {user.connected && (
          <FontAwesome5
            onPress={() => goToProfile()}
            name="user-cog"
            size={18}
            color={colors.text}
          />
        )}
      </View>
    </View>
  );
}
