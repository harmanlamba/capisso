import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editCourse } from '../../common/api/courses';
import { CoursesForm } from '../../components/courses/CoursesForm';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useCourse } from '../../common/hooks/apiHooks';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const CourseEditPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { course, loading } = useCourse(id);

  return (
    <div className={classes.content}>
      <Typography variant="h4">Edit Course</Typography>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CoursesForm initialValues={course} onSubmit={editCourse} type="Edit" />
      )}
    </div>
  );
};
