import userBasicInfoState from '@Src/global/userBasicInfos';
import userState from '@Src/global/userState';
import { subBadges } from '@squiz/shared';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { get, put } from '../wrappedFetch';

export default function useAutoSetBadges() {
  const [userBasicInfos, setUserBasicInfos] = useRecoilState(userBasicInfoState);
  const user = useRecoilValue(userState);

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

  async function autoEquipBadge() {
    if (!userBasicInfos || !user.token) return;
    for (const i in subBadges) {
      const { broadcasterId, name } = subBadges[i];
      const isSub = await fetchFromTwitch(broadcasterId, user.token);
      if (isSub) {
        put({ path: 'me-edit', token: user.token, body: { badge: name } });
        setUserBasicInfos({ ...userBasicInfos, badge: name });
      }
    }
  }

  useEffect(() => {
    if (
      userBasicInfos &&
      (userBasicInfos.badge === '1' || userBasicInfos.badge === 'Default') &&
      user.token
    ) {
      autoEquipBadge();
    }
  }, [userBasicInfos, user]);
}
