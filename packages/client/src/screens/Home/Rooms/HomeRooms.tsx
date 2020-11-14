import { GameCard } from '@Src/components/Card';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { EmitRoom } from 'shared/src/typings/Room';

type HomeRoomProps = {
  rooms: EmitRoom[];
};

export default function HomeRooms({ rooms }: HomeRoomProps) {
  const navigation = useNavigation();

  function navigate(id: string) {
    navigation.navigate('Room', { id });
  }

  return (
    <>
      {rooms.map((room) => (
        <GameCard
          key={room.id}
          onPress={() => navigate(room.id)}
          players={room.players}
          name={room.difficulty.name}
          color={room.difficulty.color}
        />
      ))}
    </>
  );
}
