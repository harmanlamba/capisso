import React from 'react';
import { CoursesForm } from '../../components/courses/CoursesForm';
import { makeStyles, Typography } from '@material-ui/core';
import { addCourse } from '../../common/api/courses';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const CoursesAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Typography variant="h4">Add Course</Typography>
      <CoursesForm onSubmit={addCourse} type="Add" />
    </div>
  );
};
