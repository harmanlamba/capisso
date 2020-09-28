import React from 'react';
import { Button, Avatar, Typography, Box } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../../assets/GoogleIcon';

import { ITokenBlob, IUserDto } from '../../types/types';
import { postOneTimeToken } from '../../common/api/userAuth';

export const GoogleLoginButton: React.FC<{}> = () => {
  const [authenticatedUser, setAuthenticatedUser] = React.useState<IUserDto>();
  const GOOGLE_CLIENT_ID: string = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

  React.useEffect(() => {
    const foundUser: IUserDto = JSON.parse(
      localStorage.getItem('authenticatedUser') || '{}'
    );

    if (Object.keys(foundUser).length !== 0) {
      setAuthenticatedUser(foundUser);
    }
  }, []);

  const googleSuccessfulResponse = async (response: any) => {
    const tokenBlob: ITokenBlob = {
      tokenId: response.tokenId,
    };

    setAuthenticatedUser(await postOneTimeToken(tokenBlob));

    localStorage.setItem(
      'authenticatedUser',
      JSON.stringify(authenticatedUser)
    );
  };

  const googleFailureResponse = (response: any) => {
    // Do not need to do anything in case of failure
    // The button auto-resets and allows the user to login in again
  };

  return (
    <React.Fragment>
      {authenticatedUser ? (
        <Box display="flex" alignItems="center" flexDirection="row">
          <Box>
            <Typography variant="button" display="inline">
              {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}
            </Typography>
          </Box>
          <Box p={1}>
            <Avatar src={authenticatedUser.pictureUri} />
          </Box>
        </Box>
      ) : (
        <GoogleLogin
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} startIcon={<GoogleIcon />}>
              Sign in
            </Button>
          )}
          clientId={GOOGLE_CLIENT_ID}
          onSuccess={googleSuccessfulResponse}
          onFailure={googleFailureResponse}
        />
      )}
    </React.Fragment>
  );
};

export default GoogleLoginButton;
