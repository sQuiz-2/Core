/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from 'axios';

/**
 * Create an Axios Client with defaults
 */

const client = axios.create({
  baseURL: process.env.API_URL,
});

const request = async function (options: any) {
  const onSuccess = function (response: any) {
    return response.data;
  };

  const onError = function (error: any) {
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
