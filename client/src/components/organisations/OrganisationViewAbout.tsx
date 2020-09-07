import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { IOrganisationDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
    whiteSpace: 'pre-line',
  },
}));

export const OrganisationViewAbout: React.FC<{
  organisation: IOrganisationDto;
}> = ({ organisation }) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" color="primary" display="inline">
              Organization Description
            </Typography>
            <p>{organisation.description}</p>
          </Box>
        </Paper>
      </Box>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" color="primary" display="inline">
              Address
            </Typography>
            <p>{organisation.address}</p>
          </Box>
        </Paper>
      </Box>
      <Paper>
        <Box p={2}>
          <Typography variant="h6" color="primary" display="inline">
            Classifications
          </Typography>
          <p>{organisation.classifications.join(', ')}</p>
        </Box>
      </Paper>
    </div>
  );
};
