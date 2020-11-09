type EnvVars = {
  backendUrl: string;
  twitchClientId: string;
};

type Env = {
  dev: EnvVars;
  prod: EnvVars;
};

const ENV: Env = {
  dev: {
    backendUrl: 'http://127.0.0.1:3333/',
    twitchClientId: 'b10szq70ypfb11f7decb8lbdes69mq',
  },
  prod: {
    backendUrl: 'https://backend.squiz.m4gie.com/',
    twitchClientId: '97au00focfb9x3g8rv3ugsoa7lq7hr',
  },
};

export default function getEnv(): EnvVars {
  if (__DEV__) return ENV.dev;
  else return ENV.prod;
}
