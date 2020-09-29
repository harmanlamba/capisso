import { AxiosRequestConfig } from 'axios';
import { IUserDto } from '../../types/types';

export const getAuthUser: () => IUserDto | undefined = () => {
  const user = localStorage.getItem('authenticatedUser');
  if (!user) {
    return undefined;
  } else {
    try {
      return JSON.parse(user) as IUserDto;
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
  window.location.href = '/';
};
