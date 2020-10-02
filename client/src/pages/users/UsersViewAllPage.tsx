import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import { Add, SystemUpdateAlt } from '@material-ui/icons';

import { useUsers } from '../../common/hooks/apiHooks';
import { UsersList } from '../../components/users/UsersList';
import { UsersUploadDialog } from '../../components/users/UsersUploadDialog';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `100%`,
    flexGrow: 1,
  },
}));

export const UsersViewAllPage: React.FC<{}> = () => {
  const classes = useStyles();

  const { users, refetch } = useUsers();

  const [openImportModal, setOpenImportModal] = useState<boolean>(false);
  const [filterTerm, setFilterTerm] = useState<string>();
  const [importFile, setImportFile] = useState<File>();

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setImportFile(e.target.files[0]);
      setOpenImportModal(true);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      !filterTerm ||
      user.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.userRole.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className={classes.content}>
      <Box mb={2}>
        <Grid justify="space-between" container={true}>
          <Box>
            <Typography variant="h4" display="inline">
              Users
            </Typography>
            <Box ml={2} position="relative" top="-0.5em" display="inline">
              <Button
                component={Link}
                startIcon={<Add />}
                to="/users/add"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
              <input
                accept=".csv, .xlsx, .xls"
                id="import-file-button"
                hidden={true}
                type="file"
                onChange={handleImport}
              />
              <label htmlFor="import-file-button">
                <Button
                  startIcon={<SystemUpdateAlt />}
                  component="span"
                  variant="contained"
                  color="primary"
                >
                  Bulk Import
                </Button>
              </label>
            </Box>
          </Box>
          <Box mt={0.3}>
            <TextField
              id="filter-field"
              onChange={(event) => setFilterTerm(event.target.value)}
              label="Filter"
              variant="outlined"
              size="small"
            />
          </Box>
        </Grid>
      </Box>

      <UsersList
        users={filteredUsers}
        onDelete={refetch}
        onRoleChange={refetch}
      />
      <UsersUploadDialog
        open={openImportModal}
        onClose={() => setOpenImportModal(false)}
        file={importFile!}
      />
    </div>
  );
};
