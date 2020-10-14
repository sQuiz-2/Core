import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

/** Root Home Stack */

export type HomeStackParamList = {
  SignIn: undefined;
  Home: undefined;
  Upload: undefined;
  Room: { id: string };
};

export type HomeRouteProp<T extends keyof HomeStackParamList> = RouteProp<HomeStackParamList, T>;

export type HomeNavigationProp<T extends keyof HomeStackParamList> = StackNavigationProp<
  HomeStackParamList,
  T
>;

export type HomeNavigatorProps<T extends keyof HomeStackParamList> = {
  route: HomeRouteProp<T>;
  navigation: HomeNavigationProp<T>;
};
