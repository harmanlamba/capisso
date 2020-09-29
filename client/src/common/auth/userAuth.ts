import { AxiosRequestConfig } from 'axios';
import { ILoginDto } from '../../types/types';

export const getAuthUser: () => ILoginDto | undefined = () => {
  const user = localStorage.getItem('authenticatedUser');
  if (!user) {
    return undefined;
  } else {
    try {
      return JSON.parse(user) as ILoginDto;
    } catch (e) {
      return undefined;
    }
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
