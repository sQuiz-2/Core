import { CenterContainer } from '@Src/components/Containers';
import SocketError from '@Src/components/SocketError';
import useSocketConnect from '@Src/utils/hooks/socketConnect';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import { useTheme } from '@react-navigation/native';
import { EmitRooms, EmitRoomUpdate, RoomEvent } from '@squiz/shared';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import HomeContainer from '../HomeContainer';

export default function Home() {
  const { colors } = useTheme();
  const [displayRooms, setDisplayRooms] = useState<EmitRooms>([]);
  const rooms: EmitRooms = useSocketListener(RoomEvent.Rooms, []);
  const roomUpdate: EmitRoomUpdate | null = useSocketListener(RoomEvent.RoomUpdate, null);
  const { error } = useSocketConnect();

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
    return <HomeContainer rooms={displayRooms} />;
  }
}
