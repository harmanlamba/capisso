import React from 'react';
import { makeStyles, Paper, Box, Typography } from '@material-ui/core';
import { ICourseDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '75%',
    paddingLeft: '2em',
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
            <Typography variant="h6" display="inline" color="textSecondary">
              Course Name
            </Typography>
            <Typography variant="subtitle1">{course.name}</Typography>
          </Box>
        </Paper>
      </Box>

      {course.code && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" display="inline" color="textSecondary">
                Course Code
              </Typography>
              <Typography variant="subtitle1">{course.code}</Typography>
            </Box>
          </Paper>
        </Box>
      )}

      {course.description && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" display="inline" color="textSecondary">
                Course Description
              </Typography>
              <Typography variant="subtitle1">{course.description}</Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};
