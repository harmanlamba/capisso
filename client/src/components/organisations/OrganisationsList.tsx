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
import { IOrganisationDto } from '../../types/types';
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
            <StyledTableCell> Number of Projects </StyledTableCell>
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
              <StyledTableCell> {row.projectCount} </StyledTableCell>
              <StyledTableCell>
                <OrganisationStatusChip status={row.status.toString()} />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
