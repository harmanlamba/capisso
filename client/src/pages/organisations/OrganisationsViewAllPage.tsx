import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Box, Typography, Button } from '@material-ui/core';

import { getAllOrganisations } from '../../common/api/organisations';
import { IOrganisationDto } from '../../types/types';
import { OrganisationsList } from '../../components/organisations/OrganisationsList';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `100%`,
    flexGrow: 1,
  },
}));

export const OrganisationsViewAllPage: React.FC<{}> = () => {
  const classes = useStyles();

  const [organisations, setOrganisations] = useState<IOrganisationDto[]>([]);

  useEffect(() => {
    getAllOrganisations().then((data) => setOrganisations(data));
  }, []);

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Typography variant="h4" display="inline">
          Organisations
        </Typography>
        <Box ml={2} position="relative" top="-0.5em" display="inline">
          <Button
            component={Link}
            to="/organisations/add"
            variant="contained"
            color="primary"
          >
            + Add
          </Button>
        </Box>
      </Box>

      <OrganisationsList organisations={organisations} />
    </div>
  );
};
