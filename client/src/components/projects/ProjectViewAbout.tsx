import React from 'react';
import { makeStyles, Paper, Box, Typography } from '@material-ui/core';
import { IProjectDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
    whiteSpace: 'pre-line',
  },
}));

export const ProjectViewAbout: React.FC<{ project: IProjectDto }> = ({
  project,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" color="primary" display="inline">
              Project Title
            </Typography>
            <p>{project.title}</p>
          </Box>
        </Paper>
      </Box>
      {project.notes && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Notes
              </Typography>
              <p>{project.notes}</p>
            </Box>
          </Paper>
        </Box>
      )}

      {project.outcome && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Outcomes
              </Typography>
              <p>{project.outcome}</p>
            </Box>
          </Paper>
        </Box>
      )}
      {project.startDate && project.endDate && (
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" color="primary" display="inline">
                Start date - End date
              </Typography>
              <p>
                {project.startDate} - {project.endDate}
              </p>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};
