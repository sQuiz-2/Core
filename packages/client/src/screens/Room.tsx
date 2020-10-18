import { useFocusEffect, useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

import CenterContainer from '../components/CenterContainer';
import { Quiz } from '../components/Game';
import getEnv from '../constant/index';
import pseudoState from '../global/pseudoState';
import socketState from '../global/socket';
import { HomeNavigatorProps } from '../typings/navigation';
import { useSocketListener } from '../utils/hooks/socketListener';
import { titleCase } from '../utils/text';

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  const setSocket = useSetRecoilState(socketState);
  const pseudo = useRecoilValue(pseudoState);
  const { colors } = useTheme();
  const roomInfos: { title: string; difficulty: string } | null = useSocketListener('infos', null);

  useEffect(() => {
    if (!roomInfos) return;
    navigation.setOptions({ headerTitle: 'Salon ' + titleCase(roomInfos.difficulty) });
  }, [roomInfos]);

  useFocusEffect(
    React.useCallback(() => {
      if (!pseudo) return;
      const socket = io(getEnv().serverUrl + route.params.id, {
        query: {
          pseudo,
        },
        reconnectionAttempts: 3,
      });
      setSocket(socket);
      return () => socket.close();
    }, [pseudo])
  );

  if (!roomInfos) {
    return (
      <CenterContainer>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  }

  return <Quiz />;
}
