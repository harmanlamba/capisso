import axios from 'axios';
import { ICreatedDto, IOrganisationDto, IProjectDto } from '../../types/types';

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

export const getOrganisation = async (
  organisationId: number
): Promise<IOrganisationDto> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/organisations/${organisationId}`
  );

  return res.data as IOrganisationDto;
};

export const editOrganisation = async (
  organisation: IOrganisationDto
): Promise<void> => {
  await axios.put(
    `${process.env.REACT_APP_API_BASE}/organisations/${organisation.id}`,
    organisation
  );
};

export const getProjectsForOrganisation = async (
  organisationId: number
): Promise<IProjectDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/projects?organisationId=${organisationId}`
  );

  return res.data as IProjectDto[];
};
