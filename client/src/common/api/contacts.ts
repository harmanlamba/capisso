import axios from 'axios';
import { IContactDto } from '../../types/types';

export const getAllContactsForOrganisation = async (
  organisationId: number | undefined
): Promise<IContactDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/contacts?organisationId=${organisationId}`
  );
  return res.data as IContactDto[];
};
