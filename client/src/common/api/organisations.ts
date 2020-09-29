import axios from 'axios';
import { ICreatedDto, IOrganisationDto, IProjectDto } from '../../types/types';
import { getAxiosConfig } from '../auth/userAuth';

export const addOrganisation = async (
  organisation: IOrganisationDto
): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/organisations`,
    organisation,
    getAxiosConfig()
  );

  return res.data as ICreatedDto;
};

export const getAllOrganisations = async (): Promise<IOrganisationDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/organisations`,
    getAxiosConfig()
  );

  return res.data as IOrganisationDto[];
};

export const getOrganisation = async (
  organisationId: number
): Promise<IOrganisationDto> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/organisations/${organisationId}`,
    getAxiosConfig()
  );

  return res.data as IOrganisationDto;
};

export const editOrganisation = async (
  organisation: IOrganisationDto
): Promise<void> => {
  await axios.put(
    `${process.env.REACT_APP_API_BASE}/organisations/${organisation.id}`,
    organisation,
    getAxiosConfig()
  );
};

export const getProjectsForOrganisation = async (
  organisationId: number
): Promise<IProjectDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/projects?organisationId=${organisationId}`,
    getAxiosConfig()
  );

  return res.data as IProjectDto[];
};
