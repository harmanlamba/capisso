import React from 'react';
import { Button, Avatar, Typography, Box } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../../assets/GoogleIcon';

import { ITokenBlob, IUserDto } from '../../types/types';
import { postOneTimeToken } from '../../common/api/userAuth';
import { Dialog } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogContentText } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';

export const GoogleLoginButton: React.FC<{}> = () => {
  const [authenticatedUser, setAuthenticatedUser] = React.useState<IUserDto>();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

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

    try {
      const userDto: IUserDto = await postOneTimeToken(tokenBlob);
      setAuthenticatedUser(userDto);

      localStorage.setItem('authenticatedUser', JSON.stringify(userDto));

      window.location.href = '/organisations';
    } catch (e) {
      setErrorMessage(
        'Google Account rejected, make sure your account is enabled in Capisso.'
      );
    }
  };

  const googleFailureResponse = (response: any) => {
    const error = response.details ?? response.error;
    setErrorMessage(error);
  };

  return (
    <React.Fragment>
      <Dialog open={!!errorMessage}>
        <DialogTitle id="alert-dialog-title">Login Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setErrorMessage('')}
            color="primary"
            autoFocus={true}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
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
