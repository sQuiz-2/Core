import { get } from './wrappedFetch';

export async function refreshToken(userToken: string) {
  const newToken = await get<{ token: string }>({
    path: 'refresh-twitch-token',
    token: userToken,
  });
  return newToken;
}

export async function checkIsSub(broadcasterId: string, twitchToken: string, twitchId: string) {
  const request = new Request(
    `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${broadcasterId}&user_id=${twitchId}`,
    { method: 'get' }
  );
  try {
    const res = await fetch(request, {
      //@ts-ignore
      headers: {
        Authorization: `Bearer ${twitchToken}`,
        'content-type': 'application/json',
        'Client-id': process.env.TWITCH_CLIENT_ID,
      },
    });
    return res.status;
  } catch (ex) {
    return 404;
  }
}

export async function isSubProcess(
  broadcasterId: string,
  userToken: string,
  twitchToken: string,
  twitchId: string
) {
  let twitchStatus = await checkIsSub(broadcasterId, twitchToken, twitchId);
  if (twitchStatus === 401) {
    const newToken = await refreshToken(userToken);
    if (!newToken) return false;
    twitchStatus = await checkIsSub(broadcasterId, newToken.token, twitchId);
  }
  if (twitchStatus !== 200) return false;
  return true;
}
