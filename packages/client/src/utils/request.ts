import getEnv from '../constant';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
function parseJSON(response: Response) {
  return new Promise((resolve) =>
    response.json().then((json) =>
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      })
    )
  );
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise}           The request promise
 */
export default function request(url: string, options?: RequestInit | undefined): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(getEnv().apiUrl + url, options)
      .then(parseJSON)
      .then((response: any) => {
        if (response.ok) {
          return resolve(response.json);
        }
        return reject(response.json.errors);
      })
      .catch((error) => reject(error));
  });
}
