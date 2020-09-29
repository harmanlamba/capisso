import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { addProject } from '../../common/api/projects';
import { ProjectsForm } from '../../components/projects/ProjectsForm';
import {
  useOrganisations,
  useContactsForOrganisation,
  useCourses,
} from '../../common/hooks/apiHooks';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ProjectsAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  const [organisationId, setOrganisationId] = useState<number>(0);

  const organisations = useOrganisations();
  const contactsForOrganisation = useContactsForOrganisation(organisationId);
  const courses = useCourses();

  return (
    <div className={classes.content}>
      <Typography variant="h4">Add project</Typography>
      {organisations.loading || courses.loading ? (
        <LoadingSpinner />
      ) : (
        <ProjectsForm
          onSubmit={addProject}
          type="add"
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
