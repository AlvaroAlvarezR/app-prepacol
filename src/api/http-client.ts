import axios, { AxiosInstance, AxiosResponse } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  },
});

const responseBody = (response: AxiosResponse<any>) => response.data;

const requests = {
  post: (url: string, body: {}) => {
    return httpClient.post(url, body)
      .then(responseBody)
      .catch(errorBody => {
        throw errorBody;
      });
  },
};

export default requests;
