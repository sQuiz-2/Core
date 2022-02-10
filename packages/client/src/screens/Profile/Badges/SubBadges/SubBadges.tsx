import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import { get, put } from '@Src/utils/wrappedFetch';
import { badgeNames, subBadges } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import LockedBadge from '../../LockedBadge';

type RewardBadgesProps = {
  handlePress: (badgeId: string) => void;
};

export default function SubBadges({ handlePress }: RewardBadgesProps) {
  const [userBasicInfos, setUserBasicInfos] = useRecoilState(userBasicInfoState);
  const user = useRecoilValue(userState);
  const [subList, setSubList] = useState<{ badgeId: string; isSub: boolean }[]>([]);

  async function fetchFromTwitch(broadcasterId: string, userToken: string) {
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
      if (res.status === 401) {
        // The twitch token can be expired so wev try again with a new token
        const newToken = await get<{ token: string }>({
          path: 'refresh-twitch-token',
          token: userToken,
        });
        if (!newToken) return false;
        setUserBasicInfos({ ...userBasicInfos!, twitchToken: newToken.token });
        return false;
      } else if (res.status !== 200) throw new Error();
      return true;
    } catch (ex) {
      return false;
    }
  }

  async function fetchUnlockedBadges() {
    if (!userBasicInfos || !user.token) return;
    const subs = [];
    for (const i in subBadges) {
      const { broadcasterId, id } = subBadges[i];
      const isSub = await fetchFromTwitch(broadcasterId, user.token);
      // If the user is not sub anymore but still have the badge
      if (isSub === false && userBasicInfos.badge === id) {
        put({ path: 'me-edit', token: user.token, body: { badge: badgeNames.Default } });
        setUserBasicInfos({ ...userBasicInfos, badge: badgeNames.Default });
      }
      subs.push({ badgeId: id, isSub });
    }
    setSubList(subs);
  }

  useEffect(() => {
    if (!userBasicInfos?.twitchId) return;
    fetchUnlockedBadges();
  }, [userBasicInfos]);

  if (!userBasicInfos) return null;

  return (
    <>
      {subBadges.map((sub) => {
        return (
          <View key={sub.id}>
            <LockedBadge
              onPress={handlePress}
              selected={userBasicInfos.badge === sub.id}
              name={sub.name}
              id={sub.id}
              lock={!subList.find(({ badgeId, isSub }) => badgeId === sub.id && isSub)}
            />
          </View>
        );
      })}
    </>
  );
}
