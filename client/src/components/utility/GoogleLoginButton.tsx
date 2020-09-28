import React from 'react';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../../assets/GoogleIcon';

export const GoogleLoginButton: React.FC<{}> = () => {
  const GOOGLE_CLIENT_ID: string = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

  const googleSuccessfulResponse = (response: any) => {
    const tokenBlob = {
      tokenId: response.tokenId,
    };

    // Dispatch received token to send to backend to receive jwt token
    // dispatch(sendTokenAndLogin(tokenBlob));
  };

  const googleFailureResponse = (response: any) => {
    // Do not need to do anything in case of failure
    // The button auto-resets and allows the user to login in again
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default GoogleLoginButton;
