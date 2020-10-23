import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';

import Header from '../components/Header/Header';
import AddRound from '../screens/Add';
import Home from '../screens/Home';
import Room from '../screens/Room';
import { HomeStackParamList } from '../typings/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

function LogoTitle() {
  return (
    <Image style={{ width: 60, height: 60 }} source={require('./../../assets/icon-small.png')} />
  );
}

export default function HomeStack() {
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
      <Stack.Screen name="Home" options={{ headerTitle: () => <LogoTitle /> }} component={Home} />
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
    </Stack.Navigator>
  );
}
