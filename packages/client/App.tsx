import { AlertNotification } from '@Src/components/Notification';
import SocketError from '@Src/components/SocketError';
import soundVolumeState from '@Src/global/soundVolume';
import userBasicInfoState from '@Src/global/userBasicInfos';
import useHomeSocketError from '@Src/screens/Home/Home/useHomeSocketError';
import useHomeSocket from '@Src/utils/hooks/homeSocket';
import { useSound } from '@Src/utils/hooks/sound';
import useListener from '@Src/utils/hooks/useListener';
import { get } from '@Src/utils/wrappedFetch';
import { NavigationContainer } from '@react-navigation/native';
import { MeBasic, oAuthResponse, RoomEvent, SocketErrors } from '@squiz/shared';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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
  const notificationSound = useSound({ source: require('@Assets/sounds/notification.mp3') });
  useListener(RoomEvent.AdminMessage, handleMessage, true);

  function handleMessage({ message, user }: { message: string; user: string }) {
    toast.custom(
      ({ duration }) => <AlertNotification user={user} message={message} duration={duration} />,
      {
        position: 'bottom-left',
        duration: 5000,
      }
    );
    notificationSound?.play();
  }
  /* useAutoSetBadges(); */

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

    if (!user || !user.token) return;
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
        <Toaster />
        <HomeStack />
      </NavigationContainer>
    );
  }
}
