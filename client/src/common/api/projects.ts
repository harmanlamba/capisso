import axios from 'axios';
import { ICreatedDto, IProjectDto } from '../../types/types';
import { getAxiosConfig } from '../auth/userAuth';

export const addProject = async (
  project: IProjectDto
): Promise<ICreatedDto> => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_BASE}/projects`,
    project
  );

  return res.data as ICreatedDto;
};

export const getProject = async (projectId: number): Promise<IProjectDto> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/projects/${projectId}`,
    getAxiosConfig()
  );
  return res.data as IProjectDto;
};

export const getAllProjects = async (): Promise<IProjectDto[]> => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_BASE}/projects`,
    getAxiosConfig()
  );

  return res.data as IProjectDto[];
};

export const editProject = async (project: IProjectDto): Promise<void> => {
  await axios.put(
    `${process.env.REACT_APP_API_BASE}/projects/${project.id}`,
    project,
    getAxiosConfig()
  );
};
