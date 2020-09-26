import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editContact } from '../../../common/api/contacts';
import { useContact } from '../../../common/hooks/apiHooks';
import { ContactForm } from '../../../components/contact/ContactForm';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ContactsEditPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { contact, loading } = useContact(id);

  return (
    <div className={classes.content}>
      <Typography variant="h4">Edit Contact</Typography>
      {loading ? (
        <LoadingSpinner />
      ) : (
        contact && (
          <ContactForm
            initialValues={contact}
            onSubmit={editContact}
            type="edit"
          />
        )
      )}
    </div>
  );
};
