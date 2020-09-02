import React from 'react';
import {
  makeStyles,
  withStyles,
  TableCell,
  TableContainer,
  Table,
  Paper,
  Chip,
  TableHead,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { IOrganisationDto } from '../../types/types';

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const getStatusColor = (status: string) => {
  if (status === 'Active') {
    return 'primary';
  } else if (status === 'Inactive') {
    return 'default';
  } else {
    return 'default';
  }
};

export const OrganisationsList: React.FC<{
  organisations: IOrganisationDto[];
}> = (props) => {
  const classes = useStyles();
  const organisations = props.organisations;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell> Organization Name </StyledTableCell>
            <StyledTableCell> Classifications </StyledTableCell>
            <StyledTableCell> Number Projects </StyledTableCell>
            <StyledTableCell> Status </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organisations.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell> {row.name} </StyledTableCell>
              <StyledTableCell>
                {row.classifications.join(', ')}
              </StyledTableCell>
              <StyledTableCell> 0 </StyledTableCell>
              <StyledTableCell>
                <Chip label={row.status} color={getStatusColor(row.status)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
