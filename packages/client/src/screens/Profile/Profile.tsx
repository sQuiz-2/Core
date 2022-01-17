import Card, { TitleCard } from '@Src/components/Card';
import React from 'react';
import { View } from 'react-native';

import Avatars from './Avatars';
import Badges from './Badges';
import DisconnectButton from './Disconnect';
import useProfileStyle from './ProfileStyle';

export default function Profile() {
  const styles = useProfileStyle();

  return (
    <View style={styles.container}>
      <View style={styles.containerAvatar}>
        <TitleCard title="AVATAR">
          <Avatars />
        </TitleCard>
      </View>
      <View style={styles.containerAvatar}>
        <TitleCard title="BADGES">
          <Badges />
        </TitleCard>
      </View>
      <Card style={styles.disconnectContainer}>
        <DisconnectButton />
      </Card>
    </View>
  );
}
