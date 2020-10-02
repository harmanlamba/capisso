import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import { UsersUploadList } from './UsersUploadList';
import { useParseUsersCsv } from '../../common/hooks/parsingHooks';
import { Add } from '@material-ui/icons';
import { UsersUploadAlert } from './UsersUploadAlert';

const useStyles = makeStyles(() => ({
  modalContent: {
    margin: '0px',
  },
  dialog: {
    background: '#f4f4f4',
  },
  textField: {
    margin: '12px 0',
  },
  button: {
    margin: '0 5px',
  },
}));

export interface IUsersUploadDialogProps {
  open: boolean;
  onClose: () => void;
  file: File;
}

export const UsersUploadDialog: React.FC<IUsersUploadDialogProps> = ({
  open,
  onClose,
  file,
}) => {
  const classes = useStyles();
  const { data, loading, errors } = useParseUsersCsv(file);

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth={true}>
      <DialogTitle>Importing users from {file?.name}</DialogTitle>
      <DialogContent className={classes.dialog}>
        {loading ? (
          <LoadingSpinner />
        ) : errors.length > 0 ? (
          <UsersUploadAlert errors={errors} />
        ) : (
          <div className={classes.modalContent}>
            <Box
              className={classes.textField}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Preview:</Typography>
              <Typography variant="h6">{data.length} Users</Typography>
            </Box>
            {data.length > 0 ? (
              <UsersUploadList data={data} />
            ) : (
              'No data found'
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Box
          className={classes.textField}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
        >
          <Button
            className={classes.button}
            variant="contained"
            color="default"
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          {errors.length === 0 && (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => onClose()}
              startIcon={<Add />}
            >
              Add Users
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};
