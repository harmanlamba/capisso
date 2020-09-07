import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editProject, getProject } from '../../common/api/projects';
import { useCourses, useOrganisations } from '../../common/hooks/apiHooks';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ProjectsForm } from '../../components/projects/ProjectsForm';
import { IProjectDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
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
        <LoadingSpinner />
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
