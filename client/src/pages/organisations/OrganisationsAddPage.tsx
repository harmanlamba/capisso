import React from 'react';
import { OrganisationsForm } from '../../components/organisations/OrganisationsForm';
import { makeStyles, Typography } from '@material-ui/core';
import { addOrganisation } from '../../common/api/organisations';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const OrganisationsAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Typography variant="h4">Add Organisation</Typography>
      <OrganisationsForm onSubmit={addOrganisation} type="add" />
    </div>
  );
};
