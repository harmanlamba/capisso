import axios from 'axios';
import { IUserDto, ITokenBlob } from '../../types/types';

export const postOneTimeToken = async (
  tokenBlob: ITokenBlob
): Promise<IUserDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/user/login`,
    tokenBlob
  );

  return res.data as IUserDto;
};
