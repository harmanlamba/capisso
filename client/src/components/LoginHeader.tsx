import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import GoogleLoginButton from '../components/utility/GoogleLoginButton';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({}));

export const LoginHeader: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box width="100%" display="flex" justifyContent="flex-end">
      <GoogleLoginButton />
    </Box>
  );
};
