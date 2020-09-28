import React from 'react';

import GoogleLoginButton from '../components/utility/GoogleLoginButton';
import { Box } from '@material-ui/core';

export const LoginHeader: React.FC<{}> = () => {
  return (
    <Box width="100%" display="flex" justifyContent="flex-end">
      <GoogleLoginButton />
    </Box>
  );
};
