import React from 'react';
import {
  IContactDto,
  ICourseDto,
  IOrganisationDto,
  IProjectDto,
  IUserDto,
} from '../../types/types';
import { getAllContactsForOrganisation, getContact } from '../api/contacts';
import { getAllCourses, getCourse } from '../api/courses';
import { getAllOrganisations, getOrganisation } from '../api/organisations';
import { getAllProjects, getProject } from '../api/projects';
import { getAllUsers } from '../api/users';

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

export const useCourse = (id: number) => {
  const [error, setError] = React.useState<Error>();
  const [course, setCourse] = React.useState<ICourseDto>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    getCourse(id)
      .then((data) => setCourse(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { course, loading, error };
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

export const useProject = (id: number) => {
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState<boolean>();
  const [project, setProject] = React.useState<IProjectDto>();

  React.useEffect(() => {
    setLoading(true);
    getProject(id)
      .then((data) => setProject(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { project, loading, error };
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

export const useContactsForOrganisation = (orgId: number | undefined) => {
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [contacts, setContacts] = React.useState<IContactDto[]>([]);

  React.useEffect(() => {
    setLoading(true);
    getAllContactsForOrganisation(orgId)
      .then((data) => setContacts(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [orgId]);

  return { contacts, loading, error };
};

export const useContact = (contactId: number | undefined) => {
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [contact, setContact] = React.useState<IContactDto>();

  React.useEffect(() => {
    setLoading(true);
    getContact(contactId)
      .then((data) => setContact(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [contactId]);

  return { contact, loading, error };
};

export const useUsers = () => {
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [users, setUsers] = React.useState<IUserDto[]>([]);

  const fetchUsers = () => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};
