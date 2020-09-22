import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';

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
  const [filterTerm, setFilterTerm] = useState<string>();

  useEffect(() => {
    getAllOrganisations().then((data) => setOrganisations(data));
  }, []);

  const filteredOrganisations = organisations.filter(
    (organisation) =>
      !filterTerm ||
      organisation.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      organisation.classifications.some((classification) =>
        classification.toLowerCase().includes(filterTerm.toLowerCase())
      ) ||
      organisation.status.toLowerCase().startsWith(filterTerm.toLowerCase())
  );

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Grid justify="space-between" container={true}>
          <Box>
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

      <OrganisationsList organisations={filteredOrganisations} />
    </div>
  );
};
