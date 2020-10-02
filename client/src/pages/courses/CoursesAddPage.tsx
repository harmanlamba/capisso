import React from 'react';
import { CoursesForm } from '../../components/courses/CoursesForm';
import { makeStyles, Typography } from '@material-ui/core';
import { addCourse } from '../../common/api/courses';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const CoursesAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.content}>
      <Typography variant="h4">Add Course</Typography>
      <CoursesForm
        type="Add"
        onSubmit={addCourse}
        handleCancel={() => history.goBack()}
        handleSubmitSuccess={() => history.push('/courses')}
      />
    </div>
  );
};
