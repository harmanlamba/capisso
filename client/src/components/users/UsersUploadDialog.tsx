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
import React, { useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import { UsersUploadList } from './UsersUploadList';
import { useParseUsersCsv } from '../../common/hooks/parsingHooks';
import { Add } from '@material-ui/icons';
import { UsersUploadAlert } from './UsersUploadAlert';
import { addUserCollection } from '../../common/api/users';
import { SnackbarMessage } from '../utility/SnackbarMessage';
import { UsersUploadHelp } from './UsersUploadHelp';

const useStyles = makeStyles(() => ({
  dialog: {
    background: '#f4f4f4',
  },
  text: {
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
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      await addUserCollection(data);
      onClose();
    } catch (e) {
      console.error(e);
      setSnackBarOpen(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth={true}>
        <DialogTitle>
          Importing users from {file?.name} <UsersUploadHelp />
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          {loading ? (
            <LoadingSpinner />
          ) : errors.length > 0 ? (
            <UsersUploadAlert errors={errors} />
          ) : (
            <>
              <Box
                className={classes.text}
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
                <Typography className={classes.text} align="center">
                  No Data Found
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Box
            className={classes.text}
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
            {errors.length === 0 && data.length > 0 && (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                startIcon={<Add />}
              >
                Confirm
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
      <SnackbarMessage
        text="The request could not be made. Please ensure that all new emails are unique and are not already registered"
        severity="error"
        isOpen={snackBarOpen}
        setOpen={setSnackBarOpen}
      />
    </>
  );
};
