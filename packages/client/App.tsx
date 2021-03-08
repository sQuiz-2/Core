import SocketError from '@Src/components/SocketError';
import soundVolumeState from '@Src/global/soundVolume';
import userBasicInfoState from '@Src/global/userBasicInfos';
import useHomeSocketError from '@Src/screens/Home/Home/useHomeSocketError';
import useHomeSocket from '@Src/utils/hooks/homeSocket';
import { get } from '@Src/utils/wrappedFetch';
import { NavigationContainer } from '@react-navigation/native';
import { MeBasic, oAuthResponse, SocketErrors } from '@squiz/shared';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { CenterContainer } from './src/components/Containers';
import Theme from './src/constant/theme';
import userState from './src/global/userState';
import HomeStack from './src/navigation/HomeStack';
import { Linking } from './src/navigation/Linking';
import loadFonts from './src/utils/fonts';
import { getFromStore, StorageEnum } from './src/utils/storage';

registerRootComponent(App);

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadResources() {
    await loadFonts();
    setFontLoaded(true);
  }

  useEffect(function mount() {
    if (Platform.OS !== 'web') {
      loadResources();
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        {Platform.OS !== 'web' && !fontLoaded ? <ActivityIndicator /> : <AppWithProviders />}
      </RecoilRoot>
      <StatusBar
        // eslint-disable-next-line react/style-prop-object
        style="light"
      />
    </>
  );
}

function AppWithProviders() {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);
  const setUserBasicInfoState = useSetRecoilState(userBasicInfoState);
  const setSoundVolume = useSetRecoilState(soundVolumeState);
  useHomeSocket(onSocketConnected);
  const error = useHomeSocketError();

  useEffect(function mount() {
    getSoundVolume();
    setIsLoading(false);
  }, []);

  async function getSoundVolume() {
    const soundVolume = (await getFromStore<number>(StorageEnum.SoundVolume)) ?? 1;
    setSoundVolume(soundVolume);
  }

  async function getUserInfos() {
    const user = await getFromStore<oAuthResponse>(StorageEnum.User);
    if (user) {
      setUser({ ...user, connected: true, privateCode: null });
    } else {
      setUser({ username: null, token: null, connected: false, privateCode: null, staff: false });
    }

    try {
      const meBasicInfos = await get<MeBasic>({ path: 'me-basic', token: user?.token });
      if (!meBasicInfos) return;
      setUserBasicInfoState(meBasicInfos);
    } catch (error) {
      console.error(error);
    }
  }

  function onSocketConnected() {
    getUserInfos();
  }

  if (isLoading) {
    return (
      <CenterContainer>
        <ActivityIndicator />
      </CenterContainer>
    );
  } else if (error && error === SocketErrors.ServerFull) {
    return (
      <CenterContainer>
        <SocketError error={error} />
      </CenterContainer>
    );
  } else {
    return (
      <NavigationContainer linking={Linking} theme={Theme}>
        <HomeStack />
      </NavigationContainer>
    );
  }
}
