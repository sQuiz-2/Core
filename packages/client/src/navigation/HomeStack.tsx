import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Header from '../components/Header';
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
      <Stack.Screen name="Home" options={{ title: 'sQuiz' }} component={Home} />
      <Stack.Screen
        name="Room"
        component={Room}
        options={{
          header: (props) => <Header {...props} context="Room" />,
          title: 'sQuiz',
        }}
      />
      <Stack.Screen name="Add" options={{ title: 'Ajouter | sQuiz' }} component={AddRound} />
      <Stack.Screen name="FAQ" options={{ title: 'FAQ | sQuiz' }} component={FAQ} />
    </Stack.Navigator>
  );
}
