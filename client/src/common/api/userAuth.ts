import axios from 'axios';
import { ILoginDto, ITokenBlob } from '../../types/types';

export const postOneTimeToken = async (
  tokenBlob: ITokenBlob
): Promise<ILoginDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/users/login`,
    tokenBlob
  );

  return res.data as ILoginDto;
};
