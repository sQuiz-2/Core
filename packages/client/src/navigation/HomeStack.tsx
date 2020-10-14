import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

import { fontFamilies } from '../constant/theme';
import pseudoState from '../global/pseudoState';
import Home from '../screens/Home';
import Room from '../screens/Room';
import SignIn from '../screens/SignIn';
import { HomeStackParamList } from '../typings/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

function LogoTitle() {
  return (
    <Image style={{ width: 60, height: 60 }} source={require('./../../assets/icon-small.png')} />
  );
}

export default function HomeStack() {
  const pseudo = useRecoilValue(pseudoState);
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        title: 'sQuiz',
        headerTitleAlign: 'center',
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.accent, borderBottomColor: colors.text },
        headerTitleStyle: { fontFamily: fontFamilies.medium },
      }}>
      {pseudo == null ? (
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerTitle: () => <LogoTitle /> }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            options={{ headerTitle: () => <LogoTitle /> }}
            component={Home}
          />
          <Stack.Screen
            name="Room"
            component={Room}
            options={{
              headerRight: () => <LogoTitle />,
              headerStyle: { backgroundColor: colors.accent, borderBottomColor: colors.accent },
              headerBackTitleVisible: false,
              headerTitleAlign: 'left',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
