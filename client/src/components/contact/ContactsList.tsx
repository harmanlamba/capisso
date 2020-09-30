import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import { IContactDto } from '../../types/types';
import { ContactStatusChip } from './ContactStatusChip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

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

export const ContactsList: React.FC<{
  contacts: IContactDto[];
}> = ({ contacts }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name </StyledTableCell>
            <StyledTableCell>Email </StyledTableCell>
            <StyledTableCell>Phone Number </StyledTableCell>
            <StyledTableCell> Status </StyledTableCell>
            <StyledTableCell>Edit </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((row) => (
            <TableRow key={row.id}>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell> {row.email} </StyledTableCell>
              <StyledTableCell> {row.phoneNumber} </StyledTableCell>
              <StyledTableCell>
                <ContactStatusChip status={row.status} />
              </StyledTableCell>
              <StyledTableCell>
                <Link
                  to={`/organisations/${row.organisationId}/contacts/${row.id}/edit`}
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
