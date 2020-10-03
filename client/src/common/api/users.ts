import axios from 'axios';
import { ICreatedDto, IUserDto } from '../../types/types';
import { getAxiosConfig } from '../auth/userAuth';

export const getAllUsers = async (): Promise<IUserDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/users`,
    getAxiosConfig()
  );

  return res.data as IUserDto[];
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(
    `${process.env.REACT_APP_API_BASE}/users/${userId}`,
    getAxiosConfig()
  );
};

export const addUser = async (user: IUserDto): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/users`,
    user,
    getAxiosConfig()
  );

  return res.data as ICreatedDto;
};

export const editUser = async (user: IUserDto): Promise<void> => {
  await axios.put(
    `${process.env.REACT_APP_API_BASE}/users/${user.id}`,
    user,
    getAxiosConfig()
  );
};

export const addUserCollection = async (
  users: IUserDto[]
): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/users/collection`,
    users,
    getAxiosConfig()
  );

  return res.data as ICreatedDto;
};
