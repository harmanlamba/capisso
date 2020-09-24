import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContactsForOrganisation } from '../../common/hooks/apiHooks';
import { ContactsList } from '../../components/contact/ContactsList';
import { LoadingSpinner } from '../../components/LoadingSpinner';

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
  const { contacts, loading } = useContactsForOrganisation(id);

  return (
    <div className={classes.content}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ContactsList contacts={contacts} />
          <Button
            component={Link}
            to={`/organisations/${id}/contacts/add`}
            variant="contained"
            color="primary"
          >
            + Add Contact
          </Button>
        </>
      )}
    </div>
  );
};
