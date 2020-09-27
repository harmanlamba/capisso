import React from 'react';
import { Chip, makeStyles } from '@material-ui/core';
import { ContactStatus } from '../../enums/enums';

const useStyles = makeStyles(() => ({
  chip: {
    margin: '0 10px',
  },
}));

export const ContactStatusChip: React.FC<{ status: ContactStatus }> = ({
  status,
}) => {
  const classes = useStyles();
  const color = status === ContactStatus.Active ? 'primary' : 'default';

  return <Chip className={classes.chip} label={status} color={color} />;
};
