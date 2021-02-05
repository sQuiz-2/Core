import { ResponsiveContainer } from '@Src/components/Containers';
import React from 'react';
import { View } from 'react-native';

import CreateRoom from '../CreateRoom/CreateRoom';
import JoinRoom from '../JoinRoom';
import useCustomRoomStyle from './CustomRoomStyle';

export default function CustomRoom() {
  const styles = useCustomRoomStyle();
  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.join}>
        <JoinRoom />
      </View>
      <View style={styles.create}>
        <CreateRoom />
      </View>
    </ResponsiveContainer>
  );
}
