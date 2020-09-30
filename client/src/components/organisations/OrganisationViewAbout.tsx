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
            <Typography variant="h6" display="inline" color="textSecondary">
              Organization Description
            </Typography>
            <Typography variant="subtitle1">
              {organisation.description}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" display="inline" color="textSecondary">
              Address
            </Typography>
            <Typography variant="subtitle1">{organisation.address}</Typography>
          </Box>
        </Paper>
      </Box>
      <Paper>
        <Box p={2}>
          <Typography variant="h6" display="inline" color="textSecondary">
            Classifications
          </Typography>
          <Typography variant="subtitle1">
            {organisation.classifications.join(', ')}
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};
