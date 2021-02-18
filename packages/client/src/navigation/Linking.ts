import { LinkingOptions } from '@react-navigation/native';

const Linking: LinkingOptions = {
  prefixes: [],
  enabled: true,
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: '',
      Room: 'room/:id',
      Custom: 'custom',
      FAQ: 'faq',
      Profile: 'profil',
    },
  },
};

export { Linking };
