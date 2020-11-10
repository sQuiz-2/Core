import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import Card from '../../../components/Card/Card';
import Text from '../../../components/Text';
import userState from '../../../global/userState';
import ProfileConnected from '../ProfileConnected';
import ProfileNotConnected from '../ProfileNotConnected';
import useProfileContainerStyle from './ProfileContainerStyle';

export default function ProfileContainer() {
  const user = useRecoilValue(userState);
  const styles = useProfileContainerStyle();

  return (
    <Card style={styles.container}>
      <Text style={styles.title} fontFamily="title" fontSize="xxl">
        PROFIL
      </Text>
      <View style={styles.content}>
        {user.token ? <ProfileConnected /> : <ProfileNotConnected />}
      </View>
    </Card>
  );
}
