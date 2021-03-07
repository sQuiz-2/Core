import { CenterContainer, ResponsiveContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import CreateRoom from '../CreateRoom/CreateRoom';
import JoinRoom from '../JoinRoom';
import useCustomRoomStyle from './CustomRoomStyle';

export default function CustomRoom() {
  const styles = useCustomRoomStyle();
  const user = useRecoilValue(userState);

  return (
    <ResponsiveContainer style={styles.container}>
      {user.connected === true ? (
        <>
          <View style={styles.join}>
            <JoinRoom />
          </View>
          <View style={styles.create}>
            <CreateRoom />
          </View>
        </>
      ) : (
        <CenterContainer>
          <Text fontSize="lg" style={styles.bold}>
            Pour rejoindre ou créer une partie privée, vous devez vous connecter.
          </Text>
        </CenterContainer>
      )}
    </ResponsiveContainer>
  );
}
