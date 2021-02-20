import Card, { TitleCard } from '@Src/components/Card';
import userBasicInfoState from '@Src/global/userBasicInfos';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import Avatars from './Avatars';
import DisconnectButton from './Disconnect';
import useProfileStyle from './ProfileStyle';

export default function Profile() {
  const userBasicInfos = useRecoilValue(userBasicInfoState);

  const styles = useProfileStyle();

  if (!userBasicInfos) return null;

  return (
    <View style={styles.container}>
      <View style={styles.containerAvatar}>
        <TitleCard title="AVATAR">
          <Avatars />
        </TitleCard>
      </View>
      <Card style={styles.disconnectContainer}>
        <DisconnectButton />
      </Card>
    </View>
  );
}
