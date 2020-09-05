import React from 'react';

import { getAllOrganisations } from '../api/organisations';
import { getAllCourses } from '../api/courses';
import { IOrganisationDto, ICourseDto } from '../../types/types';

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
