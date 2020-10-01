import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Delete, Person, SupervisorAccount } from '@material-ui/icons';
import React, { useState } from 'react';
import { deleteUser, editUser } from '../../common/api/users';
import { IUserDto } from '../../types/types';
import { UserRole } from '../../enums/enums';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { SnackbarMessage } from '../utility/SnackbarMessage';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `100%`,
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
    width: '100%',
  },
}));

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

export const UsersList: React.FC<{
  users: IUserDto[];
  onDelete(): void;
  onRoleChange(): void;
}> = ({ users, onDelete, onRoleChange }) => {
  const classes = useStyles();

  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [roleEditConfirmOpen, setRoleEditConfirmOpen] = useState<boolean>(
    false
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUserDto>();

  const handleDelete = async () => {
    if (!selectedUser?.id) {
      return;
    }

    deleteUser(selectedUser?.id)
      .then(onDelete)
      .catch((e) => {
        console.error(e);
        setSnackBarOpen(true);
      })
      .finally(() => setDeleteConfirmOpen(false));
  };

  const handleRoleEdit = async () => {
    if (!selectedUser?.id) {
      return;
    }

    const updated: IUserDto = {
      ...selectedUser,
      userRole:
        selectedUser.userRole === UserRole.User
          ? UserRole.Admin
          : UserRole.User,
    };

    editUser(updated)
      .then(onRoleChange)
      .catch((e) => {
        console.error(e);
        setSnackBarOpen(true);
      })
      .finally(() => setRoleEditConfirmOpen(false));
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>User Email</StyledTableCell>
              <StyledTableCell>User Role</StyledTableCell>
              <StyledTableCell>User Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover={true}
                classes={{
                  root: 'no-underline',
                }}
              >
                <StyledTableCell>
                  <Typography color="textSecondary" style={{ fontWeight: 500 }}>
                    {user.email}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>{user.userRole}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip
                    title={
                      user.userRole === UserRole.User
                        ? 'Promote to admin'
                        : 'Demote to user'
                    }
                  >
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        setRoleEditConfirmOpen(true);
                      }}
                    >
                      {user.userRole === UserRole.User ? (
                        <SupervisorAccount />
                      ) : (
                        <Person />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete user">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        open={roleEditConfirmOpen}
        onClose={() => setRoleEditConfirmOpen(false)}
        onConfirm={handleRoleEdit}
        title={`Confirm Role ${
          selectedUser?.userRole === UserRole.User ? 'Promotion' : 'Demotion'
        }`}
        content={`Are you sure you want to ${
          selectedUser?.userRole === UserRole.User ? 'promote' : 'demote'
        } the user with email ${selectedUser?.email} to ${
          selectedUser?.userRole === UserRole.User ? 'Admin' : 'User'
        }?`}
      />

      <ConfirmationDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm User Deletion"
        content={`Are you sure you want to delete the user with email ${selectedUser?.email}?`}
      />

      <SnackbarMessage
        isOpen={snackBarOpen}
        setOpen={setSnackBarOpen}
        severity="error"
        text="The request could not be made. Please ensure that another admin exists"
      />
    </>
  );
};
