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

export const addContact = async (
  contact: IContactDto
): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/contacts`,
    contact
  );

  return res.data as ICreatedDto;
};

export const getContact = async (
  contactId: number | undefined
): Promise<IContactDto> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/contacts/${contactId}`
  );
  return res.data as IContactDto;
};

export const editContact = async (contact: IContactDto): Promise<void> => {
  await axios.put(
    `${process.env.REACT_APP_API_BASE}/contacts/${contact.id}`,
    contact
  );
};
