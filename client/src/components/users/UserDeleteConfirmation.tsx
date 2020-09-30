import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { IUserDto } from '../../types/types';

interface UserDeleteConfirmationProps {
  open: boolean;
  onConfirm(): void;
  onClose(): void;
  user?: IUserDto;
}

export const UserDeleteConfirmation: React.FC<UserDeleteConfirmationProps> = ({
  open,
  onConfirm,
  onClose,
  user,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm User Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete user with email {user?.email}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="default" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
