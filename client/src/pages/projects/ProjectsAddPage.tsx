import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { addProject } from '../../common/api/projects';
import { ProjectsForm } from '../../components/projects/ProjectsForm';
import {
  useOrganisations,
  useContactsForOrganisation,
  useCourses,
} from '../../common/hooks/apiHooks';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { IProjectDto } from '../../types/types';
import { ProjectStatus } from '../../enums/enums';

const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ProjectsAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  const location = useLocation();
  const { initialOrganisation, initialCourse } = queryString.parse(
    location.search
  );

  const [organisationId, setOrganisationId] = useState<number>(
    initialOrganisation ? +initialOrganisation : 0
  );
  const organisations = useOrganisations();
  const contactsForOrganisation = useContactsForOrganisation(organisationId);
  const courses = useCourses();

  const initialValues: IProjectDto = {
    title: '',
    startDate: '',
    endDate: '',
    status: ProjectStatus.Pending,
    organisationId: initialOrganisation ? +initialOrganisation : 0,
    courseIds: initialCourse ? [+initialCourse] : [],
  };

  return (
    <div className={classes.content}>
      <Typography variant="h4">Add project</Typography>
      {organisations.loading || courses.loading ? (
        <LoadingSpinner />
      ) : (
        <ProjectsForm
          onSubmit={addProject}
          initialValues={initialValues}
          type="Add"
          courses={courses.courses}
          organisations={organisations.organisations}
          setOrganisationId={setOrganisationId}
          contacts={contactsForOrganisation.contacts}
          contactsLoading={contactsForOrganisation.loading}
        />
      )}
    </div>
  );
};
