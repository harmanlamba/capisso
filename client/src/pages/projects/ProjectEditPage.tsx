import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editProject, getProject } from '../../common/api/projects';
import { ProjectsForm } from '../../components/projects/ProjectsForm';
import { IProjectDto } from '../../types/types';
import { useOrganisations, useCourses } from '../../common/hooks/apiHooks';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
  progressRing: {
    marginLeft: '50%',
    paddingTop: '200px',
    paddingBottom: '10px',
  },
}));

export const ProjectEditPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [project, setProject] = useState<IProjectDto>();
  const [loading, setLoading] = useState<boolean>(true);

  const { organisations } = useOrganisations();
  const { courses } = useCourses();

  useEffect(() => {
    setLoading(true);
    getProject(id)
      .then((data) => setProject(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className={classes.content}>
      <Typography variant="h4">Edit project</Typography>
      {loading ? (
        <CircularProgress
          className={classes.progressRing}
          size={60}
          thickness={6}
        />
      ) : (
        <ProjectsForm
          onSubmit={editProject}
          initialValues={project}
          type="edit"
          courses={courses}
          organisations={organisations}
        />
      )}
    </div>
  );
};
