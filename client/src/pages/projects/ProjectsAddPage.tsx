import React from 'react';
import { ProjectsForm } from '../../components/projects/ProjectsForm';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ProjectsAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <ProjectsForm />
    </div>
  );
};
