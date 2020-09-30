import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { UsersForm } from '../../components/users/UsersForm';
import { addUser } from '../../common/api/users';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const UsersAddPage: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Typography variant="h4">Add user</Typography>
      <UsersForm onSubmit={addUser} type="Add" />
    </div>
  );
};
