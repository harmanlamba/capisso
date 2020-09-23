import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Box, Typography, Button, Grid } from '@material-ui/core';

import { CoursesList } from '../../components/courses/CoursesList';
import { useCourses } from '../../common/hooks/apiHooks';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `100%`,
    flexGrow: 1,
  },
}));

export const CoursesViewAllPage: React.FC<{}> = () => {
  const classes = useStyles();

  const { courses } = useCourses();

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Grid justify="space-between" container={true}>
          <Box>
            <Typography variant="h4" display="inline">
              Courses
            </Typography>
            <Box ml={2} position="relative" top="-0.5em" display="inline">
              <Button
                component={Link}
                to="/projects/add"
                variant="contained"
                color="primary"
              >
                + Add
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>

      <CoursesList courses={courses} />
    </div>
  );
};
