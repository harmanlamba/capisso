import axios from 'axios';
import { IProjectDto, ICreatedDto } from '../../types/types';

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
    `${process.env.REACT_APP_API_BASE}/projects/${projectId}`
  );
  return res.data as IProjectDto;
};
