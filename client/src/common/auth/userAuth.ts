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
    signOutIfTokenExpired(user);
    config.headers.Authorization = `Bearer ${user.jwtToken}`;
  }

  return config;
};

export const onSignOut = () => {
  localStorage.removeItem('authenticatedUser');
  // Force React to reload so it picks up the (now empty) user localstorage state
  window.location.href = '/';
};

const signOutIfTokenExpired = (user: ILoginDto) => {
  const { exp } = jwt_decode(user.jwtToken);

  // Expire the token one minute earlier to avoid latency issues
  const expTimeInMs = exp * 1000 - 60000;
  if (Date.now() >= expTimeInMs) {
    onSignOut();
  }
};
