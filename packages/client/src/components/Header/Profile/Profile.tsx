import Badge from '@Src/components/Badge';
import { Level } from '@Src/components/ExperienceBar';
import { IsHover } from '@Src/components/Hover';
import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import DisconnectButton from '@Src/screens/Profile/Disconnect';
import avatars from '@Src/utils/loadAvatars';
import { badges } from '@Src/utils/loadBadges';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';
import { allBadgesInfos } from '@squiz/shared';
import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { useRecoilValue } from 'recoil';

import Text from '../../Text';
import SoundVolume from '../soundVolume';
import styles from './ProfileStyle';

export default function Profile() {
  const { colors } = useTheme();
  const user = useRecoilValue(userState);
  const userBasicInfos = useRecoilValue(userBasicInfoState);
  const [displayDropDown, setDisplayDropDown] = useState(false);

  const navigation = useNavigation();

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
                <Badge
                  id={userBasicInfos.badge}
                  badgeName={allBadgesInfos.find(({ id }) => id === userBasicInfos.badge)?.name}
                  imageStyle={styles.avatar}
                />
              )}
            </>
          )}
          <Text>{user.username}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
        <SoundVolume />
        <IsHover
          onHover={() => setDisplayDropDown(true)}
          onLeaveOver={() => setDisplayDropDown(false)}>
          {user.connected && <FontAwesome5 name="user-alt" size={18} color={colors.text} />}
          {displayDropDown && (
            <View style={styles.dropDownContainer}>
              <View style={styles.dropDown}>
                {profileMenu.map(({ title, icon, route }) => (
                  <Pressable
                    key={title}
                    onPress={() => navigation.navigate(route)}
                    style={styles.dropDownRow}>
                    <FontAwesome5 name={icon} size={15} color={colors.text} />
                    <Text style={styles.dropDownText}>{title}</Text>
                  </Pressable>
                ))}
                <DisconnectButton />
              </View>
            </View>
          )}
        </IsHover>
      </View>
    </View>
  );
}

const profileMenu = [
  { title: 'Personnalisation', icon: 'paint-brush', route: 'Profile' },
  { title: 'Statistiques', icon: 'chart-bar', route: 'Stats' },
  { title: 'Trophées', icon: 'trophy', route: 'Challenges' },
];
