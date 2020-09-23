import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectsForCourse } from '../../common/api/courses';
import { ProjectsList } from '../../components/projects/ProjectsList';
import { IProjectDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
    whiteSpace: 'pre-line',
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
    </div>
  );
};
