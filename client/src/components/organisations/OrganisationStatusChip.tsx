import React from 'react';
import { Chip, makeStyles } from '@material-ui/core';
import { OrganisationStatus } from '../../enums/enums';

const useStyles = makeStyles(() => ({
  chip: {
    margin: '0 10px',
  },
}));

export const OrganisationStatusChip: React.FC<{
  status: OrganisationStatus;
}> = ({ status }) => {
  const classes = useStyles();
  const color = status === OrganisationStatus.Active ? 'primary' : 'default';

  return <Chip className={classes.chip} label={status} color={color} />;
};
