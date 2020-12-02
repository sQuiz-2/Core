import { getUser } from './Auth';

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function http<T>(path: string, init: RequestInit): Promise<T | undefined> {
  const request = new Request(`${process.env.REACT_APP_API_URL}${path}`, init);
  const user = getUser();
  const response: HttpResponse<T> = await fetch(request, {
    headers: { Authorization: `Bearer ${user?.token}`, 'content-type': 'application/json' },
  });
  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw response.parsedBody;
  }
  return response.parsedBody;
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: 'get' }
): Promise<T | undefined> {
  return await http<T>(path, args);
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) }
): Promise<T | undefined> {
  return await http<T>(path, args);
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'put', body: JSON.stringify(body) }
): Promise<T | undefined> {
  return await http<T>(path, args);
}

export async function remove<T>(
  path: string,
  args: RequestInit = { method: 'delete' }
): Promise<T | undefined> {
  return await http<T>(path, args);
}
