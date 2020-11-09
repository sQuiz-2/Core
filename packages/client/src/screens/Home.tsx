import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Difficulty } from 'shared/src/enums/Difficulty';
import { EmitRoom } from 'shared/src/typings/Room';
import io from 'socket.io-client';

import { CenterContainer } from '../components/Containers';
import HomeContainer from '../components/Home/HomeContainer';
import getEnv from '../constant/index';
import { HomeNavigationProp } from '../typings/navigation';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const { colors } = useTheme();
  const [rooms, setRooms] = useState<EmitRoom[]>([]);
  const [error, setError] = useState<string | null>(null);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().backendUrl, { reconnectionAttempts: 3 });
    socket.on('full', (error: string) => {
      navigation.navigate('Home');
      setError(error);
    });
    socket.on(
      'rooms',
      (data: { title: string; difficulty: Difficulty; id: string; players: number }[]) => {
        setRooms(data);
      }
    );
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
