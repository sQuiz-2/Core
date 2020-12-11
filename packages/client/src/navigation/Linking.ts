import { LinkingOptions } from '@react-navigation/native';

const Linking: LinkingOptions = {
  prefixes: [],
  enabled: true,
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: '',
      Room: 'room/:id',
      FAQ: 'faq',
    },
  },
};

export { Linking };
