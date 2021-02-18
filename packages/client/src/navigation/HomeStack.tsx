import CustomRoom from '@Src/screens/CustomRoom';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Header from '../components/Header';
import FAQ from '../screens/FAQ';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Room from '../screens/Room';
import { HomeStackParamList } from '../typings/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export type Context = 'Home' | 'Room' | 'Profile';

export default function HomeStack() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen name="Home" options={{ title: 'sQuiz.gg' }} component={Home} />
      <Stack.Screen
        name="Custom"
        options={{ title: 'Parties personnalisées | sQuiz.gg' }}
        component={CustomRoom}
      />
      <Stack.Screen
        name="Room"
        component={Room}
        options={{
          header: (props) => <Header {...props} context="Room" />,
          title: 'sQuiz.gg',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: (props) => <Header {...props} context="Profile" />,
          title: 'Profil | sQuiz.gg',
        }}
      />
      {/* <Stack.Screen name="Add" options={{ title: 'Ajouter | sQuiz' }} component={AddRound} /> */}
      <Stack.Screen name="FAQ" options={{ title: 'FAQ | sQuiz.gg' }} component={FAQ} />
    </Stack.Navigator>
  );
}
