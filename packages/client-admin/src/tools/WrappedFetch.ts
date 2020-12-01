import { getUser } from './Auth';

export default function client(endpoint: string, body: any, { ...customConfig }: RequestInit) {
  const user = getUser();
  const headers: HeadersInit = { 'content-type': 'application/json' };
  if (user) {
    headers['Authorization'] = `Bearer ${user.token}`;
  }
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
  return fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, config).then(async (response) => {
    if (response.status === 401 && endpoint !== 'login') {
      localStorage.removeItem('credentials');
      window.location.assign('/login');
      return;
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
