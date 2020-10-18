import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import { useRecoilValue } from 'recoil';

import Header from '../components/Header/Header';
import pseudoState from '../global/pseudoState';
import AddRound from '../screens/Add';
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
        header: (props) => <Header {...props} />,
        headerStyle: {
          height: 80,
          backgroundColor: colors.primary,
          borderBottomColor: colors.border,
          borderBottomWidth: 2,
        },
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
              headerStyle: { backgroundColor: colors.primary, borderBottomColor: colors.border },
              headerBackTitleVisible: false,
              headerTitleAlign: 'left',
            }}
          />
          <Stack.Screen
            name="Add"
            options={{ headerTitle: () => <LogoTitle /> }}
            component={AddRound}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
