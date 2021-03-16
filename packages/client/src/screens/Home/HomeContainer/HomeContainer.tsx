import Text from '@Src/components/Text';
import { EmitRooms } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';

import { ResponsiveContainer } from '../../../components/Containers';
import HomeNews from '../Infos/News/News';
import HomeProfile from '../Infos/Profile';
import HomeRooms from '../Rooms/HomeRooms';
import Streams from '../Streams';
import useHomeContainerStyle from './HomeContainerStyle';

type HomeContainerProp = {
  rooms: EmitRooms;
  streams: string[];
};

export default function HomeContainer({ rooms, streams }: HomeContainerProp) {
  const styles = useHomeContainerStyle();
  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.info}>
        <HomeProfile />
        <HomeNews />
      </View>
      <View style={styles.rightContainer}>
        <Text fontSize="xxl" fontFamily="title" style={styles.title}>
          Salons classiques
        </Text>
        <View style={styles.rooms}>
          <HomeRooms rooms={rooms} />
        </View>
        {streams.length > 0 && (
          <>
            <Text fontSize="xxl" fontFamily="title" style={[styles.title, { paddingTop: 20 }]}>
              Stream en cours
            </Text>
            <Streams streams={streams} />
          </>
        )}
      </View>
    </ResponsiveContainer>
  );
}
