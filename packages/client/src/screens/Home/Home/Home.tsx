import { CenterContainer } from '@Src/components/Containers';
import SocketError from '@Src/components/SocketError';
import Text from '@Src/components/Text';
import { useHomeListener } from '@Src/utils/hooks/homeListener';
import { useTheme } from '@react-navigation/native';
import { EmitRooms, EmitRoomUpdate, RoomEvent } from '@squiz/shared';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import useHomeSocketError from './useHomeSocketError';

export default function Home() {
  const { colors } = useTheme();
  const [displayRooms, setDisplayRooms] = useState<EmitRooms>([]);
  const rooms = useHomeListener<EmitRooms>(RoomEvent.Rooms, []);
  const roomUpdate = useHomeListener<EmitRoomUpdate | null>(RoomEvent.RoomUpdate, null);
  const error = useHomeSocketError();

  useEffect(() => {
    setDisplayRooms(rooms);
  }, [rooms]);

  useEffect(() => {
    if (!roomUpdate) return;
    updateRoom(roomUpdate);
  }, [roomUpdate]);

  function updateRoom(data: EmitRoomUpdate) {
    setDisplayRooms((oldRooms) => {
      const rooms = [...oldRooms];
      const room = rooms.find((room) => room.id === data.id);
      if (!room) return oldRooms;
      room.players = data.players;
      room.isFull = data.isFull;
      return rooms;
    });
  }

  if (error) {
    return <SocketError error={error} />;
  } else if (displayRooms.length < 1) {
    return (
      <CenterContainer>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  } else {
    return (
      <CenterContainer>
        <Text fontFamily="title" fontSize="xxl">
          Encore un peu de patience 😉
        </Text>
      </CenterContainer>
    );
    /* return <HomeContainer rooms={displayRooms} />; */
  }
}
