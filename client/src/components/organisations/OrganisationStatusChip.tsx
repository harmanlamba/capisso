import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = (isActive: boolean) =>
  makeStyles((theme) => ({
    content: {
      display: 'inline-flex',
      height: '32px',
      lineHeight: '30px',
      borderRadius: '16px',
      padding: '0 12px',
      backgroundColor: isActive ? '#28a745' : '#6c757d',
      color: '#ffffff',
    },
  }));

export const OrganisationStatusChip: React.FC<{ status: string }> = ({
  status,
}) => {
  const classes = useStyles(status === 'Active')();
  return <div className={classes.content}>{status}</div>;
};
