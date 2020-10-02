import React from 'react';
import {
  TableContainer,
  makeStyles,
  TableHead,
  withStyles,
  TableCell,
  TableBody,
  Typography,
  Table,
  TableRow,
} from '@material-ui/core';
import { IUserDto } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `100%`,
    flexGrow: 1,
  },
  table: {
    minWidth: 500,
    width: '100%',
  },
}));

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

export interface IUsersUploadListProps {
  data: IUserDto[];
}

export const UsersUploadList: React.FC<IUsersUploadListProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>User Email</StyledTableCell>
            <StyledTableCell>User Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user, i) => {
            return (
              <TableRow
                key={i}
                hover={true}
                classes={{ root: 'no-underline' }}
                color="error"
              >
                <StyledTableCell>
                  <Typography color="textSecondary" style={{ fontWeight: 500 }}>
                    {user.email}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>{user.userRole}</StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
