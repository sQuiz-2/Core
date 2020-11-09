import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { useRecoilValue } from 'recoil';

import userState from '../../../global/userState';
import Card from '../../Card/Card';
import NotConnected from './NotConnected';

export default function ProfileContainer() {
  const user = useRecoilValue(userState);
  const { colors } = useTheme();

  return (
    <Card>
      {user.token ? <Text style={{ color: colors.text }}>Logged !</Text> : <NotConnected />}
    </Card>
  );
}
