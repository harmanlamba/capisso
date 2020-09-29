import jwt_decode from 'jwt-decode';
import { AxiosRequestConfig } from 'axios';
import { ILoginDto, IUserJWT } from '../../types/types';

export const getAuthUser: () => ILoginDto | undefined = () => {
  const user = localStorage.getItem('authenticatedUser');
  if (!user) {
    return undefined;
  } else {
    try {
      return JSON.parse(user) as ILoginDto;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
};

export const getAuthUserJWTData = (): IUserJWT | undefined => {
  const user = getAuthUser();
  if (!user) {
    return undefined;
  }

  try {
    const token = user.jwtToken;
    const tokenData = jwt_decode(token);
    return tokenData as IUserJWT;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const getAxiosConfig = () => {
  const config: AxiosRequestConfig = {
    headers: {},
  };

  const user = getAuthUser();
  if (user) {
    config.headers.Authorization = `Bearer ${user.jwtToken}`;
  }

  return config;
};

export const onSignOut = () => {
  localStorage.removeItem('authenticatedUser');
  // Force React to reload so it picks up the (now empty) user localstorage state
  window.location.href = '/';
};
