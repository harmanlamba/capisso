import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { addContact } from '../../../common/api/contacts';
import { useOrganisation } from '../../../common/hooks/apiHooks';
import { ContactForm } from '../../../components/contact/ContactForm';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { ContactStatus } from '../../../enums/enums';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const ContactsAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { organisation, loading } = useOrganisation(+id);

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
            type="Add"
            initialValues={{
              name: '',
              organisationId: +id,
              status: ContactStatus.Active,
            }}
          />
        </>
      ) : (
        <Typography variant="h4">Organisation not found</Typography>
      )}
    </div>
  );
};
