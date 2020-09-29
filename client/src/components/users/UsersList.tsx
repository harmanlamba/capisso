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
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { IUserDto } from '../../types/types';

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
}> = ({ users }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>User Email</StyledTableCell>
            <StyledTableCell>User Role</StyledTableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
