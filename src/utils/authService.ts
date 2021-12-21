import Lockr from 'lockr';
import { isEmpty } from 'ramda';

enum Token {
  access_token = 'access_token',
  refresh_token = 'refresh_token',
}

const getToken = () => Lockr.get(Token.access_token);
const getRefreshToken = () => Lockr.get(Token.refresh_token);

const login = (tokeResponse: any) => {
  Lockr.set(Token.access_token, tokeResponse?.access_token);
  Lockr.set(Token.refresh_token, tokeResponse?.refresh_token);
};

const logOut = () => {
  Lockr.rm(Token.access_token);
  Lockr.rm(Token.refresh_token);
};

const isAuthenticated = (currentUser: unknown) => {
  const isLoggedIn = getToken();
  return isLoggedIn && currentUser && !isEmpty(currentUser);
};

const isTokenExpired = (token: string) => {
  return false;
};

export { getRefreshToken, login, logOut, isAuthenticated, getToken };
