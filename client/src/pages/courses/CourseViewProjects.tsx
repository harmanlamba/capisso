import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectsForCourse } from '../../common/api/courses';
import { ProjectsList } from '../../components/projects/ProjectsList';
import { IProjectDto } from '../../types/types';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
    whiteSpace: 'pre-line',
  },
  button: {
    margin: '15px 0',
  },
}));

export const CourseViewProjects: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [projects, setProjects] = useState<IProjectDto[]>([]);

  useEffect(() => {
    getProjectsForCourse(id).then((data) => setProjects(data));
  }, [id]);

  return (
    <div className={classes.content}>
      <ProjectsList projects={projects} />
      <Button
        className={classes.button}
        component={Link}
        to={`/projects/add?initialCourse=${id}`}
        variant="contained"
        color="primary"
      >
        Add project
      </Button>
    </div>
  );
};
