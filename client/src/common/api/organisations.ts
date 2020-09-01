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

export const getAllOrganisations = async (): Promise<IOrganisationDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/organisations`
  );

  return res.data as IOrganisationDto[];
};
