import React from 'react';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../../assets/GoogleIcon';

import { ITokenBlob, IUserDto } from '../../types/types';
import { postOneTimeToken } from '../../common/api/userAuth';

export const GoogleLoginButton: React.FC<{}> = () => {
  const GOOGLE_CLIENT_ID: string = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

  const googleSuccessfulResponse = async (response: any) => {
    const tokenBlob: ITokenBlob = {
      tokenId: response.tokenId,
    };

    const userDto: IUserDto = await postOneTimeToken(tokenBlob);
    localStorage.setItem('authenticatedUser', JSON.stringify(userDto));
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
