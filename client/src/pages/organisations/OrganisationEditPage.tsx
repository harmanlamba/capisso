import React from 'react';
import { OrganisationsForm } from '../../components/organisations/OrganisationsForm';
import { makeStyles, CircularProgress, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { IOrganisationDto } from '../../types/types';
import {
  editOrganisation,
  getOrganisation,
} from '../../common/api/organisations';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
  progressRing: {
    marginLeft: '50%',
    paddingTop: '200px',
    paddingBottom: '10px',
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
        <CircularProgress
          className={classes.progressRing}
          size={60}
          thickness={6}
        />
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
