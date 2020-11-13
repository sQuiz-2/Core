import React from 'react';
import { useRecoilValue } from 'recoil';

import { TitleCard } from '../../../components/Card';
import userState from '../../../global/userState';
import ProfileConnected from '../ProfileConnected';
import ProfileNotConnected from '../ProfileNotConnected';
import useProfileContainerStyle from './ProfileContainerStyle';

export default function ProfileContainer() {
  const user = useRecoilValue(userState);
  const styles = useProfileContainerStyle();

  return (
    <TitleCard title="PROFIL" containerStyle={styles.container}>
      {user.token ? <ProfileConnected /> : <ProfileNotConnected />}
    </TitleCard>
  );
}
