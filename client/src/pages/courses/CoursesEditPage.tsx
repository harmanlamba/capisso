import React from 'react';
import { CoursesForm } from '../../components/courses/CoursesForm';
import { makeStyles, CircularProgress, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { ICourseDto } from '../../types/types';
import { editCourse, getCourse } from '../../common/api/courses';

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

export const CoursesEditPage: React.FC<{}> = () => {
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
        <CircularProgress
          className={classes.progressRing}
          size={60}
          thickness={6}
        />
      ) : (
        <CoursesForm initialValues={course} onSubmit={editCourse} type="edit" />
      )}
    </div>
  );
};
