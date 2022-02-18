import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import { isSubProcess } from '@Src/utils/twitch';
import { get, put } from '@Src/utils/wrappedFetch';
import { badgeNames, subBadges, TwitchInfo } from '@squiz/shared';
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
  const [twitchToken, setTwitchToken] = useState<TwitchInfo>();

  async function fetchUnlockedBadges() {
    if (!userBasicInfos || !user.token || !twitchToken) return;
    const subs = [];
    for (const i in subBadges) {
      const { broadcasterId, id } = subBadges[i];
      const isSub = await isSubProcess(
        broadcasterId,
        user.token,
        twitchToken.twitchToken as string,
        twitchToken.twitchId as string
      );
      // If the user is not sub anymore but still have the badge
      if (isSub === false && userBasicInfos.badge === id) {
        put({ path: 'me-edit', token: user.token, body: { badge: badgeNames.Default } });
        setUserBasicInfos({ ...userBasicInfos, badge: badgeNames.Default });
      }
      subs.push({ badgeId: id, isSub });
    }
    setSubList(subs);
  }

  async function fetchTwitchToken() {
    if (!userBasicInfos || !user.token) return;
    try {
      const twitchToken = await get<TwitchInfo>({ path: 'twitch-token', token: user.token });
      if (!twitchToken) return;
      setTwitchToken(twitchToken);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!twitchToken || !twitchToken.twitchToken) return;
    fetchUnlockedBadges();
  }, [twitchToken]);

  useEffect(() => {
    if (!userBasicInfos) return;
    fetchTwitchToken();
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
