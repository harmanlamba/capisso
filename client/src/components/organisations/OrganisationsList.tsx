import React from 'react';
import {
  makeStyles,
  withStyles,
  TableCell,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { IOrganisationDto } from '../../types/types';
import { Link } from 'react-router-dom';
import { OrganisationStatusChip } from './OrganisationStatusChip';

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

export const getStatusColor = (status: string) => {
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
            <TableRow
              key={row.id}
              hover={true}
              component={Link}
              to={`/organisations/${row.id}/about`}
              classes={{
                root: 'no-underline',
              }}
            >
              <StyledTableCell> {row.name} </StyledTableCell>
              <StyledTableCell>
                {row.classifications.join(', ')}
              </StyledTableCell>
              <StyledTableCell> 0 </StyledTableCell>
              <StyledTableCell>
                <OrganisationStatusChip status={row.status} />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
