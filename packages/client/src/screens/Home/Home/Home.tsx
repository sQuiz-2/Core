import { CenterContainer } from '@Src/components/Containers';
import getEnv from '@Src/constant/index';
import { HomeNavigationProp } from '@Src/typings/navigation';
import { useTheme } from '@react-navigation/native';
import { EmitRoom } from '@squiz/shared';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import io from 'socket.io-client';

import HomeContainer from '../HomeContainer';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const { colors } = useTheme();
  const [rooms, setRooms] = useState<EmitRoom>([]);
  const [error, setError] = useState<string | null>(null);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().backendUrl, { reconnectionAttempts: 3 });
    socket.on('full', (error: string) => {
      navigation.navigate('Home');
      setError(error);
    });
    socket.on('rooms', (data: EmitRoom) => {
      setRooms(data);
    });
  }, []);

  if (!error && rooms.length < 1) {
    return (
      <CenterContainer>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  }
  return <HomeContainer rooms={rooms} />;
}
