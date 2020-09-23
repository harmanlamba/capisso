import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { addContact } from '../../../common/api/contacts';
import { useOrganisations } from '../../../common/hooks/apiHooks';
import { ContactForm } from '../../../components/contact/ContactForm';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ContactsAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { organisations, loading } = useOrganisations();
  const organisation = organisations.find((o) => o.id === +id);

  return (
    <div className={classes.content}>
      {loading ? (
        <LoadingSpinner />
      ) : organisation ? (
        <>
          <Typography variant="h4">
            Adding Contact to {organisation.name}
          </Typography>
          <ContactForm
            onSubmit={addContact}
            type="add"
            initialValues={{ name: '', organisationId: +id }}
          />
        </>
      ) : (
        <Typography variant="h4">Organisation not found</Typography>
      )}
    </div>
  );
};
