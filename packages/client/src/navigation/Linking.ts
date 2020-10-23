import { LinkingOptions } from '@react-navigation/native';

const Linking: LinkingOptions = {
  prefixes: [],
  enabled: true,
  config: {
    initialRouteName: 'Home',
    screens: {
      SignIn: 'sign-in',
      Home: '',
      Add: 'add',
      Room: 'room/:id',
    },
  },
};

export { Linking };