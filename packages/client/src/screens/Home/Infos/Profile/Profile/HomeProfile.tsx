import { TitleCard } from '@Src/components/Card';
import userState from '@Src/global/userState';
import React from 'react';
import { useRecoilValue } from 'recoil';

import ProfileConnected from '../ProfileConnected';
import ProfileNotConnected from '../ProfileNotConnected';
import useHomeProfileStyle from './HomeProfileStyle';

export default function HomeProfile() {
  const user = useRecoilValue(userState);
  const styles = useHomeProfileStyle();

  return (
    <TitleCard title="PROFIL" containerStyle={styles.container}>
      {user.token ? <ProfileConnected /> : <ProfileNotConnected />}
    </TitleCard>
  );
}
