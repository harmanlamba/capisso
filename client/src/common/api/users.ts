import axios from 'axios';
import { IUserDto } from '../../types/types';
import { getAxiosConfig } from '../auth/userAuth';

export const getAllUsers = async (): Promise<IUserDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/users`,
    getAxiosConfig()
  );

  return res.data as IUserDto[];
};
