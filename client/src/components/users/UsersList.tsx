import {
  makeStyles,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { deleteUser } from '../../common/api/users';
import { IUserDto } from '../../types/types';
import { UserDeleteConfirmation } from './UserDeleteConfirmation';

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
    fontSize: 14,
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
                  <Button
                    variant="contained"
                    startIcon={<Delete />}
                    onClick={() => {
                      setSelectedUser(user);
                      setConfirmOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UserDeleteConfirmation
        open={confirmOpen}
        user={selectedUser}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};
