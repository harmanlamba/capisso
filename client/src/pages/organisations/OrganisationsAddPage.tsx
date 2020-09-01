import React from 'react';
import { OrganisationsForm } from '../../components/organisations/OrganisationsForm';
import { makeStyles } from '@material-ui/core';

import { DRAWER_WIDTH } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    flexGrow: 1,
  },
}));

export const OrganisationsAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <p>Welcome to the organisations create page</p>

      <OrganisationsForm />
    </div>
  );
};
