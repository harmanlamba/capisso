import {
  OrganisationStatus,
  ProjectStatus,
  ContactStatus,
  UserRole,
} from '../enums/enums';

export interface ICreatedDto {
  id: number;
}

export interface IOrganisationDto {
  id?: number;
  name: string;
  description: string;
  address: string;
  status: OrganisationStatus;
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
  contactId?: number;
}

export interface IContactDto {
  id?: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  status: ContactStatus;
  organisationId: number;
  projectIds?: number[];
  hasActiveProject?: boolean;
}

export interface ILoginDto {
  firstName: string;
  lastName: string;
  pictureUri: string;
  jwtToken: string;
}

export interface ITokenBlob {
  tokenId: string;
}

export interface IUserDto {
  id?: number;
  email: string;
  userRole: UserRole;
}

export interface IUserJWT {
  nameid: string;
  role: UserRole;
}
