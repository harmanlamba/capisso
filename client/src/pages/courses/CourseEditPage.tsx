import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editCourse, getCourse } from '../../common/api/courses';
import { CoursesForm } from '../../components/courses/CoursesForm';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ICourseDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const CourseEditPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [course, setCourse] = React.useState<ICourseDto>();
  const [loading, setLoading] = React.useState<boolean>();

  React.useEffect(() => {
    setLoading(true);
    getCourse(id)
      .then((data) => setCourse(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className={classes.content}>
      <Typography variant="h4">Edit Course</Typography>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CoursesForm initialValues={course} onSubmit={editCourse} type="edit" />
      )}
    </div>
  );
};
