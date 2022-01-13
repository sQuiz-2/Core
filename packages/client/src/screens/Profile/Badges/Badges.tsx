import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import badges from '@Src/utils/loadBadges';
import { get, put } from '@Src/utils/wrappedFetch';
import { badgeNames, badges as badgesList } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import LockedBadge from '../LockedBadge/LockedBadge';
import styles from './BadgeStyle';

const expiredToken = 'Expired token';

export default function Avatars() {
  const [userBasicInfos, setUserBasicInfos] = useRecoilState(userBasicInfoState);
  const user = useRecoilValue(userState);
  const [subList, setSubList] = useState<{ badgeName: string; isSub: boolean }[]>([]);

  async function fetchFromTwitch(broadcasterId: string) {
    const request = new Request(
      `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${broadcasterId}&user_id=${userBasicInfos?.twitchId}`,
      { method: 'get' }
    );
    try {
      const res = await fetch(request, {
        //@ts-ignore
        headers: {
          Authorization: `Bearer ${userBasicInfos?.twitchToken}`,
          'content-type': 'application/json',
          'Client-id': process.env.TWITCH_CLIENT_ID,
        },
      });
      if (res.status !== 200) throw new Error(expiredToken);
      return true;
    } catch (ex) {
      return false;
    }
  }

  async function fetchUnlockedBadges() {
    if (!userBasicInfos || !user.token) return;
    const subs = [];
    for (const i in badgesList) {
      const { broadcasterId, name } = badgesList[i];
      let isSub: boolean = false;
      try {
        isSub = await fetchFromTwitch(broadcasterId);
      } catch (error: any) {
        // The twitch token can be expired so wev try again with a new token
        if (error.message === expiredToken) {
          const newToken = await get<{ token: string }>({
            path: 'refresh-twitch-token',
            token: user.token,
          });
          if (!newToken) return;
          setUserBasicInfos({ ...userBasicInfos, twitchToken: newToken.token });
        }
      }
      // If the user is not sub anymore but still have the badge
      if (isSub === false && userBasicInfos.badge === name) {
        put({ path: 'me-edit', token: user.token, body: { badge: badgeNames.Default } });
        setUserBasicInfos({ ...userBasicInfos, badge: badgeNames.Default });
      }
      subs.push({ badgeName: name, isSub });
    }
    setSubList(subs);
  }

  useEffect(() => {
    if (!userBasicInfos?.twitchId) return;
    fetchUnlockedBadges();
  }, [userBasicInfos]);

  function onPress(badge: string) {
    if (!userBasicInfos || !user.token) return;
    setUserBasicInfos({ ...userBasicInfos, badge });
    try {
      put({ path: 'me-edit', token: user.token, body: { badge } });
    } catch (error) {
      console.error(error);
    }
  }

  if (!userBasicInfos) return null;

  return (
    <View style={styles.container}>
      {Object.entries(badges).map(([key, value]) => {
        return (
          <View key={key}>
            <LockedBadge
              onPress={onPress}
              selected={userBasicInfos.badge === key}
              image={value}
              name={key}
              lock={!subList.find(({ badgeName, isSub }) => badgeName === key && isSub)}
              lockText=""
            />
          </View>
        );
      })}
    </View>
  );
}
