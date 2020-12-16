import { GameCard } from '@Src/components/Card';
import { useNavigation } from '@react-navigation/native';
import { EmitRooms } from '@squiz/shared';
import React from 'react';

type HomeRoomProps = {
  rooms: EmitRooms;
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
          name={room.title}
          color={room.difficulty.color}
          isFull={room.isFull}
        />
      ))}
    </>
  );
}
