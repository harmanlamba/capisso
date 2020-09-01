export interface ICreatedDto {
  id: number;
}

export interface IOrganisationDto {
  name: string;
  description: string;
  address: string;
  status: string;
  classifications: string[];
}
