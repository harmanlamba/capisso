import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { editOrganisation } from '../../common/api/organisations';
import { useOrganisation } from '../../common/hooks/apiHooks';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { OrganisationsForm } from '../../components/organisations/OrganisationsForm';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const OrganisationsEditPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { organisation, loading } = useOrganisation(id);

  return (
    <div className={classes.content}>
      <Typography variant="h4">Edit Organisation</Typography>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <OrganisationsForm
          initialValues={organisation}
          onSubmit={editOrganisation}
          type="Edit"
        />
      )}
    </div>
  );
};
