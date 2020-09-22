import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
    whiteSpace: 'pre-line',
  },
}));

export const OrganisationViewContacts: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <div className={classes.content}>
      <Button
        component={Link}
        to={`/organisations/${id}/contacts/add`}
        variant="contained"
        color="primary"
      >
        + Add Contact
      </Button>
    </div>
  );
};
