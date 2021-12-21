import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID || '',
    authority: process.env.REACT_APP_AZURE_AUTHORITY,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['openid'],
};

export const config = {
  SITE_TITLE: process.env.REACT_APP_SITE_TITLE,
  API_ROOT: process.env.REACT_APP_API_ROOT,
  HOST_URL: process.env.REACT_APP_HOST_URL,
  PROTOCOL: process.env.REACT_APP_PROTOCOL,
};
