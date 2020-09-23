import React from 'react';
import { ICourseDto, IOrganisationDto, IProjectDto } from '../../types/types';
import { getAllCourses } from '../api/courses';
import { getAllOrganisations, getOrganisation } from '../api/organisations';
import { getAllProjects } from '../api/projects';

export const useOrganisations = () => {
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [organisations, setOrganisations] = React.useState<IOrganisationDto[]>(
    []
  );

  React.useEffect(() => {
    getAllOrganisations()
      .then((data) => setOrganisations(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { organisations, loading, error };
};

export const useCourses = () => {
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [courses, setCourses] = React.useState<ICourseDto[]>([]);

  React.useEffect(() => {
    getAllCourses()
      .then((data) => setCourses(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { courses, loading, error };
};

export const useProjects = () => {
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [projects, setProjects] = React.useState<IProjectDto[]>([]);

  React.useEffect(() => {
    getAllProjects()
      .then((data) => setProjects(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
};

export const useOrganisation = (id: number) => {
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState<boolean>();
  const [organisation, setOrganisation] = React.useState<IOrganisationDto>();

  React.useEffect(() => {
    setLoading(true);
    getOrganisation(id)
      .then((data) => setOrganisation(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { organisation, loading, error };
};
