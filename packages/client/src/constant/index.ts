type EnvVars = {
  serverUrl: string;
  apiUrl: string;
};

type Env = {
  dev: EnvVars;
  prod: EnvVars;
};

const ENV: Env = {
  dev: {
    serverUrl: 'http://127.0.0.1:4240/',
    apiUrl: 'http://127.0.0.1:3333/',
  },
  prod: {
    serverUrl: 'https://socket.squiz.m4gie.com/',
    apiUrl: 'https://api.squiz.m4gie.com/',
  },
};

export default function getEnv(): EnvVars {
  if (__DEV__) return ENV.dev;
  else return ENV.prod;
}
