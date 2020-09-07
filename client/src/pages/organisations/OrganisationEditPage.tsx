import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  editOrganisation,
  getOrganisation,
} from '../../common/api/organisations';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { OrganisationsForm } from '../../components/organisations/OrganisationsForm';
import { IOrganisationDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const OrganisationsEditPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [organisation, setOrganisation] = React.useState<IOrganisationDto>();
  const [loading, setLoading] = React.useState<boolean>();

  React.useEffect(() => {
    setLoading(true);
    getOrganisation(id)
      .then((data) => setOrganisation(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className={classes.content}>
      <Typography variant="h4">Edit Organisation</Typography>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <OrganisationsForm
          initialValues={organisation}
          onSubmit={editOrganisation}
          type="edit"
        />
      )}
    </div>
  );
};
