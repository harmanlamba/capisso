import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { editProject } from '../../common/api/projects';
import {
  useContactsForOrganisation,
  useCourses,
  useOrganisations,
  useProject,
} from '../../common/hooks/apiHooks';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ProjectsForm } from '../../components/projects/ProjectsForm';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ProjectEditPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [organisationId, setOrganisationId] = useState<number>();

  const project = useProject(id);
  const organisations = useOrganisations();
  const contactsForOrganisation = useContactsForOrganisation(
    organisationId === undefined
      ? project.project?.organisationId
      : organisationId
  );
  const courses = useCourses();

  return (
    <div className={classes.content}>
      <Typography variant="h4">Edit project</Typography>
      {project.loading || organisations.loading || courses.loading ? (
        <LoadingSpinner />
      ) : (
        <ProjectsForm
          onSubmit={editProject}
          initialValues={project.project}
          type="Edit"
          courses={courses.courses}
          organisations={organisations.organisations}
          setOrganisationId={setOrganisationId}
          contacts={contactsForOrganisation.contacts}
        />
      )}
    </div>
  );
};
