import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import io from 'socket.io-client';

import Card from '../components/Card';
import CenterContainer from '../components/CenterContainer';
import Text from '../components/Text';
import getEnv from '../constant/index';
import { HomeNavigationProp } from '../typings/navigation';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const { colors } = useTheme();
  const [rooms, setRooms] = useState<
    { title: string; difficulty: string; id: string; players: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().serverUrl, { reconnectionAttempts: 3 });
    socket.on('full', (error: string) => {
      navigation.navigate('Home');
      setError(error);
    });
    socket.on(
      'rooms',
      (data: { title: string; difficulty: string; id: string; players: number }[]) => {
        setRooms(data);
      }
    );
  }, []);

  function navigate(id: string) {
    navigation.navigate('Room', { id });
  }

  if (!error && rooms.length < 1) {
    return (
      <CenterContainer>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  }

  return (
    <CenterContainer footerEnable>
      <Text fontFamily="title" fontSize="lg">
        {error}
      </Text>
      <View style={styles.cardsContainter}>
        {rooms.map((room) => (
          <Card
            key={room.id}
            onPress={() => navigate(room.id)}
            players={room.players}
            title={room.difficulty}
          />
        ))}
      </View>
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
  cardsContainter: {
    flexDirection: 'row',
  },
});
