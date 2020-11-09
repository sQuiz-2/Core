import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import userState from '../../../global/userState';
import Card from '../../Card/Card';
import Text from '../../Text';
import ProfileNotConnected from '../ProfileNotConnected';
import useProfileContainerStyle from './ProfileContainerStyle';

export default function ProfileContainer() {
  const user = useRecoilValue(userState);
  const { colors } = useTheme();
  const styles = useProfileContainerStyle();

  return (
    <Card style={styles.container}>
      <Text style={styles.title} fontFamily="title" fontSize="xxl">
        PROFIL
      </Text>
      <View style={styles.content}>
        {user.token ? (
          <Text style={{ color: colors.text }}>Logged !</Text>
        ) : (
          <ProfileNotConnected />
        )}
      </View>
    </Card>
  );
}
