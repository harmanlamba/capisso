import React from 'react';
import {
  TableContainer,
  TableHead,
  withStyles,
  TableCell,
  TableBody,
  Typography,
  Table,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import { IUserDto } from '../../types/types';
import { UploadCsvUserError } from '../../common/hooks/parsingHooks';

const useStyles = makeStyles(() => ({
  errorRow: {
    background: '#fdecea',
  },
}));

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

export interface IUsersUploadListProps {
  data: IUserDto[];
  errors: UploadCsvUserError[];
}

export const UsersUploadList: React.FC<IUsersUploadListProps> = ({
  data,
  errors,
}) => {
  const classes = useStyles();
  const rowsWithErrors = errors.reduce((prev, curr) => {
    prev.add(curr.row);
    return prev;
  }, new Set<number>());

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
            const hasError = rowsWithErrors.has(i + 1);
            return (
              <TableRow
                className={hasError ? classes.errorRow : ''}
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
