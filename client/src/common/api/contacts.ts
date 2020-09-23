import axios from 'axios';
import { IContactDto, ICreatedDto } from '../../types/types';

export const getAllContactsForOrganisation = async (
  organisationId: number | undefined
): Promise<IContactDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/contacts?organisationId=${organisationId}`
  );
  return res.data as IContactDto[];
};

export const addContact = async (course: IContactDto): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/contacts`,
    course
  );

  return res.data as ICreatedDto;
};
