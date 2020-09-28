import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { addProject } from '../../common/api/projects';
import { ProjectsForm } from '../../components/projects/ProjectsForm';
import { useOrganisations, useCourses } from '../../common/hooks/apiHooks';

const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ProjectsAddPage: React.FC<{}> = () => {
  const classes = useStyles();

  const organisations = useOrganisations();
  const { courses } = useCourses();

  return (
    <div className={classes.content}>
      <Typography variant="h4">Add project</Typography>
      <ProjectsForm
        onSubmit={addProject}
        type="add"
        courses={courses}
        organisations={organisations}
      />
    </div>
  );
};
