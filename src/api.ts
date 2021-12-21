import axios from 'axios';

import headers from 'common/headers';
import authorizationHeaders from 'common/authHeaders';
import getBaseUrl from 'utils/getBaseUrl';
import { getToken } from 'utils/authService';

const api = axios.create({
  headers,
  baseURL: getBaseUrl(),
});

api.interceptors.request.use((config) => {
  const accessToken = getToken();
  if (accessToken && config?.headers) {
    config.headers.Authorization = authorizationHeaders.bearer(accessToken);
  }

  return Promise.resolve(config);
});
