import { TitleCard } from '@Src/components/Card';
import userState from '@Src/global/userState';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import AdminMessage from './AdminMessage';
import Avatars from './Avatars';
import Badges from './Badges';
import useProfileStyle from './ProfileStyle';

export default function Profile() {
  const styles = useProfileStyle();
  const user = useRecoilValue(userState);

  return (
    <View style={styles.container}>
      <View style={styles.containerAvatar}>
        <TitleCard title="AVATAR">
          <Avatars />
        </TitleCard>
      </View>
      <View style={styles.containerBadge}>
        <TitleCard title="BADGE">
          <Badges />
        </TitleCard>
      </View>
      {user.staff && (
        <View style={styles.containerBadge}>
          <TitleCard title="ADMIN">
            <AdminMessage />
          </TitleCard>
        </View>
      )}
    </View>
  );
}
