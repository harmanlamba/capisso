import axios from 'axios';
import { IOrganisationDto, ICreatedDto } from '../../types/types';

export const addOrganisation = async (
  organisation: IOrganisationDto
): Promise<ICreatedDto> => {
  const res = await axios.post(
    'http://localhost:5000/organisations',
    organisation
  );

  return res.data as ICreatedDto;
};
