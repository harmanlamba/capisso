import { ProjectStatus } from '../enums/enums';

export interface ICreatedDto {
  id: number;
}

export interface IOrganisationDto {
  id?: number;
  name: string;
  description: string;
  address: string;
  status: string;
  classifications: string[];
  projectCount?: number;
}

export interface ICourseDto {
  id?: number;
  name: string;
  code: string;
  description: string;
}

export interface IProjectDto {
  id?: number;
  title: string;
  notes?: string;
  outcome?: string;
  startDate: string;
  endDate?: string;
  status: ProjectStatus;
  organisationId: number;
  courseIds: number[];
}
