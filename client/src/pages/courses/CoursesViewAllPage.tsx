import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

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

  const [filterTerm, setFilterTerm] = useState<string>();

  const filteredCourses = courses.filter(
    (course) =>
      !filterTerm ||
      course.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(filterTerm.toLowerCase())
  );

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
                to="/courses/add"
                variant="contained"
                color="primary"
              >
                + Add
              </Button>
            </Box>
          </Box>
          <Box mt={0.3}>
            <TextField
              id="filter-field"
              onChange={(event) => setFilterTerm(event.target.value)}
              label="Filter"
              variant="outlined"
              size="small"
            />
          </Box>
        </Grid>
      </Box>

      <CoursesList courses={filteredCourses} />
    </div>
  );
};
