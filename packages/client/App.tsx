import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import CenterContainer from './src/components/CenterContainer';
import Text from './src/components/Text';
import theme from './src/constant/theme';
import pseudoState from './src/global/pseudoState';
import HomeStack from './src/navigation/HomeStack';
import loadFonts from './src/utils/fonts';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadRessources() {
    await loadFonts();
    setFontLoaded(true);
  }

  useEffect(function mount() {
    if (Platform.OS !== 'web') {
      loadRessources();
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        {Platform.OS !== 'web' && !fontLoaded ? (
          <ActivityIndicator focusable />
        ) : (
          <PaperProvider theme={theme}>
            <AppWithProviders />
          </PaperProvider>
        )}
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
  const setPseudo = useSetRecoilState(pseudoState);

  useEffect(function mount() {
    getPseudo();
  }, []);

  async function getPseudo() {
    const value = await AsyncStorage.getItem('pseudo');
    if (value) {
      setPseudo(JSON.parse(value));
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <CenterContainer>
        <Text fontSize="xl">sQuiz</Text>
      </CenterContainer>
    );
  }

  const linking: LinkingOptions = {
    prefixes: [],
    enabled: true,
    config: {
      initialRouteName: 'Home',
      screens: {
        SignIn: 'sign-in',
        Home: '',
        Upload: 'add-sound',
        Room: 'room/:id',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <HomeStack />
    </NavigationContainer>
  );
}
