import { CenterContainer } from '@Src/components/Containers';
import getEnv from '@Src/constant/index';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { EmitRooms, EmitRoomUpdate, RoomEvent } from '@squiz/shared';
import React, { useState, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import io from 'socket.io-client';

import HomeContainer from '../HomeContainer';

export default function Home() {
  const { colors } = useTheme();
  const [rooms, setRooms] = useState<EmitRooms>([]);
  const socket = useRef<SocketIOClient.Socket | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (socket.current) return;
      socket.current = io(getEnv().backendUrl, { reconnectionAttempts: 3 });
      socket.current.on(RoomEvent.Rooms, setRooms);
      socket.current.on(RoomEvent.RoomUpdate, updateRoom);
      return () => {
        if (!socket.current) return;
        socket.current?.close();
        socket.current = null;
      };
    }, [])
  );

  function updateRoom(data: EmitRoomUpdate) {
    setRooms((oldRooms) => {
      const rooms = [...oldRooms];
      const room = rooms.find((room) => room.id === data.id);
      if (!room) return oldRooms;
      room.players = data.players;
      return rooms;
    });
  }

  if (rooms.length < 1) {
    return (
      <CenterContainer>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  }
  return <HomeContainer rooms={rooms} />;
}
