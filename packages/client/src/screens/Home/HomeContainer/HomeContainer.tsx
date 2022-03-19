import { ResponsiveContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { EmitRooms } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

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
  const user = useRecoilValue(userState);

  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.info}>
        <HomeProfile />
        <HomeNews />
      </View>
      <View style={styles.rightContainer}>
        <Text fontSize="xxl" fontFamily="title" style={styles.title}>
          {user.token ? 'Salons classiques' : 'Connectez vous pour rejoindre un salon !'}
        </Text>
        {user.token && (
          <View style={styles.rooms}>
            <HomeRooms rooms={rooms} />
          </View>
        )}
        {streams.length > 0 && (
          <>
            <Text fontSize="xxl" fontFamily="title" style={[styles.title, { paddingTop: 20 }]}>
              Streams en cours
            </Text>
            <Streams streams={streams} />
          </>
        )}
      </View>
    </ResponsiveContainer>
  );
}
