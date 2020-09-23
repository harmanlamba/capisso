import React from 'react';
import { makeStyles, Paper, Box, Typography } from '@material-ui/core';
import { ICourseDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
    whiteSpace: 'pre-line',
  },
}));

export const CourseViewAbout: React.FC<{ course: ICourseDto }> = ({
  course,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" color="primary" display="inline">
              Course Name
            </Typography>
            <p>{course.name}</p>
          </Box>
        </Paper>
      </Box>

      {course.code && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Course Code
              </Typography>
              <p>{course.code}</p>
            </Box>
          </Paper>
        </Box>
      )}

      {course.description && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Course Description
              </Typography>
              <p>{course.description}</p>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};
