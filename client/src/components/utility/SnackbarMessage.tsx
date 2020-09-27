import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export interface ISnackbarMessageProps {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const SnackbarMessage: React.FC<ISnackbarMessageProps> = ({
  isOpen,
  setOpen,
  severity,
  text,
}) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={() => setOpen(false)}
      >
        {text}
      </MuiAlert>
    </Snackbar>
  );
};
