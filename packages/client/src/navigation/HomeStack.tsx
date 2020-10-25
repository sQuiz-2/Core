import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Header from '../components/Header/Header';
import AddRound from '../screens/Add';
import FAQ from '../screens/FAQ';
import Home from '../screens/Home';
import Room from '../screens/Room';
import { HomeStackParamList } from '../typings/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export type Context = 'Home' | 'Room';

export default function HomeStack() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Room"
        component={Room}
        options={{
          header: (props) => <Header {...props} context="Room" />,
        }}
      />
      <Stack.Screen name="Add" component={AddRound} />
      <Stack.Screen name="FAQ" component={FAQ} />
    </Stack.Navigator>
  );
}
