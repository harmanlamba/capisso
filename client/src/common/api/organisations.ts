import axios from 'axios';
import { IOrganisationDto, ICreatedDto } from '../../types/types';

export const addOrganisation = async (
  organisation: IOrganisationDto
): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/organisations`,
    organisation
  );

  return res.data as ICreatedDto;
};
