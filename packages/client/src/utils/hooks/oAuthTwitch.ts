import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import getEnv from '../../constant';
import userState from '../../global/userState';
import client from '../request';
import { setInStore, StorageEnum } from '../storage';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const TwitchDiscovery = {
  authorizationEndpoint: 'https://id.twitch.tv/oauth2/authorize',
  tokenEndpoint: 'https://id.twitch.tv/oauth2/token',
  revocationEndpoint: 'https://id.twitch.tv/oauth2/revoke',
};

export default function useOAuthTwitch() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: getEnv().twitchClientId,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy: false,
      }),
      scopes: ['openid', 'user_read'],
    },
    TwitchDiscovery
  );
  const [loading, setLoading] = useState(false);
  const setUser = useSetRecoilState(userState);

  // Display button only when the request is loaded
  useEffect(() => {
    if (!request && !loading) {
      setLoading(true);
    } else if (request && loading) {
      setLoading(false);
    }
  }, [request]);

  async function connect(code: string) {
    setLoading(true);
    try {
      const user = await client('oauth', { method: 'POST' }, { code, provider: 0 });
      setUser({
        username: user.username,
        token: user.token,
      });
      setInStore(StorageEnum.User, user);
    } catch (error) {
      console.log(error.body);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      connect(code);
    } else {
      setLoading(false);
    }
  }, [response]);

  return { promptAsync, loading };
}
