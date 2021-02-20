import { useAuthRequest, ResponseType, makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import userState from '../../global/userState';
import { setInStore, StorageEnum } from '../storage';
import { post } from '../wrappedFetch';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const TwitchDiscovery = {
  authorizationEndpoint: 'https://id.twitch.tv/oauth2/authorize',
  tokenEndpoint: 'https://id.twitch.tv/oauth2/token',
  revocationEndpoint: 'https://id.twitch.tv/oauth2/revoke',
};

export default function useOAuthTwitch(onSuccess: (token: string) => void) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: process.env.TWITCH_CLIENT_ID || '',
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({}),
      scopes: ['user:read:email'],
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
      const user = await post<{ username: string; token: string }>({
        path: 'oauth',
        body: { code, provider: 0 },
      });
      if (!user) return;
      setUser({
        username: user.username,
        token: user.token,
        connected: true,
        privateCode: null,
      });
      setInStore(StorageEnum.User, user);
      onSuccess(user.token);
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
