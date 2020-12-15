interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

type RequestParams = {
  path: string;
  args?: RequestInit;
  token?: string;
};

interface RequestParamsBody extends RequestParams {
  body: any;
}

export async function http<T>(
  path: string,
  init: RequestInit,
  token?: string
): Promise<T | undefined> {
  const request = new Request(`${process.env.BACKEND_URL}${path}`, init);
  const response: HttpResponse<T> = await fetch(request, {
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
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

export async function get<T>({
  path,
  args = { method: 'get' },
  token,
}: RequestParams): Promise<T | undefined> {
  return await http<T>(path, args, token);
}

export async function post<T>({
  path,
  body,
  args = { method: 'post', body: JSON.stringify(body) },
  token,
}: RequestParamsBody): Promise<T | undefined> {
  return await http<T>(path, args, token);
}

export async function put<T>({
  path,
  body,
  args = { method: 'put', body: JSON.stringify(body) },
  token,
}: RequestParamsBody): Promise<T | undefined> {
  return await http<T>(path, args, token);
}

export async function remove<T>({
  path,
  args = { method: 'delete' },
  token,
}: RequestParams): Promise<T | undefined> {
  return await http<T>(path, args, token);
}
