import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { deleteUser } from '../../common/api/users';
import { IUserDto } from '../../types/types';
import { ConfirmationDialog } from '../ConfirmationDialog';

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

export const UsersList: React.FC<{
  users: IUserDto[];
  onDelete(): void;
}> = ({ users, onDelete }) => {
  const classes = useStyles();

  const [confirmOpen, setConfirmOpen] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<IUserDto>();

  const handleDelete = async () => {
    if (!selectedUser?.id) {
      return;
    }

    await deleteUser(selectedUser.id);
    setConfirmOpen(false);
    onDelete();
  };

  return (
    <>
      <TableContainer component={Paper}>
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
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.userRole}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedUser(user);
                      setConfirmOpen(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm User Deletion"
        content={`Are you sure you want to delete the user with email ${selectedUser?.email}?`}
      />
    </>
  );
};
