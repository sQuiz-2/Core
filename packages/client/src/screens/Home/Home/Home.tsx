import { CenterContainer } from '@Src/components/Containers';
import SocketError from '@Src/components/SocketError';
import useListener from '@Src/utils/hooks/useListener';
import { useTheme } from '@react-navigation/native';
import { EmitRooms, EmitRoomUpdate, RoomEvent } from '@squiz/shared';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import HomeContainer from '../HomeContainer';
import useHomeSocketError from './useHomeSocketError';

export default function Home() {
  const { colors } = useTheme();
  const [displayRooms, setDisplayRooms] = useState<EmitRooms>([]);
  useListener(RoomEvent.Rooms, setRooms, true);
  useListener(RoomEvent.RoomUpdate, setUpdateRoom, true);
  const error = useHomeSocketError();

  function setRooms(rooms: EmitRooms) {
    setDisplayRooms(rooms);
  }

  function setUpdateRoom(roomUpdate: EmitRoomUpdate) {
    setDisplayRooms((oldRooms) => {
      const rooms = [...oldRooms];
      const room = rooms.find((room) => room.id === roomUpdate.id);
      if (!room) return oldRooms;
      room.players = roomUpdate.players;
      room.isFull = roomUpdate.isFull;
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
