import { EmitRooms } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';

import { ResponsiveContainer } from '../../../components/Containers';
import HomeNews from '../Infos/News/News';
import HomeProfile from '../Infos/Profile';
import HomeRooms from '../Rooms/HomeRooms';
import useHomeContainerStyle from './HomeContainerStyle';

type HomeContainerProp = {
  rooms: EmitRooms;
};

export default function HomeContainer({ rooms }: HomeContainerProp) {
  const styles = useHomeContainerStyle();
  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.info}>
        <HomeProfile />
        <HomeNews />
      </View>
      <View style={styles.rooms}>
        <HomeRooms rooms={rooms} />
      </View>
    </ResponsiveContainer>
  );
}
