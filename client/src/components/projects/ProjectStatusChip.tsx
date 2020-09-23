import React from 'react';
import { Chip, makeStyles } from '@material-ui/core';

import { ProjectStatus } from '../../enums/enums';

const statusLabels = {
  [ProjectStatus.Pending]: 'Pending',
  [ProjectStatus.InProgress]: 'In Progress',
  [ProjectStatus.CompletedSuccessfully]: 'Completed Successfully',
  [ProjectStatus.CompletedWithIssues]: 'Completed With Issues',
};

const useStyles = makeStyles(() => ({
  chip: {
    margin: '0 10px',
  },
}));

export const ProjectStatusChip: React.FC<{ status: ProjectStatus }> = ({
  status,
}) => {
  const classes = useStyles();
  const label = statusLabels[status];
  const color =
    status === ProjectStatus.CompletedWithIssues ? 'secondary' : 'default';

  return <Chip className={classes.chip} label={label} color={color} />;
};