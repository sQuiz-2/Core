import getEnv from '../constant';

export default function client(endpoint: string, { ...customConfig }: RequestInit, body?: any) {
  const headers: HeadersInit = { 'content-type': 'application/json' };
  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${getEnv().backendUrl}${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
