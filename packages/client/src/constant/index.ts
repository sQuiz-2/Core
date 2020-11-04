type EnvVars = {
  backendUrl: string;
};

type Env = {
  dev: EnvVars;
  prod: EnvVars;
};

const ENV: Env = {
  dev: {
    backendUrl: 'http://127.0.0.1:3333/',
  },
  prod: {
    backendUrl: 'https://backend.squiz.m4gie.com/',
  },
};

export default function getEnv(): EnvVars {
  if (__DEV__) return ENV.dev;
  else return ENV.prod;
}
