import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { addContact } from '../../../common/api/contacts';
import { useOrganisations } from '../../../common/hooks/apiHooks';
import { ContactForm } from '../../../components/contact/ContactForm';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ContactsAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { organisations } = useOrganisations();
  const { id } = useParams();

  return (
    <div className={classes.content}>
      <Typography variant="h4">Add Contact to Organisation</Typography>
      <ContactForm
        onSubmit={addContact}
        organisations={organisations}
        type="add"
        initialValues={{ name: '', organisationId: id }}
      />
    </div>
  );
};
