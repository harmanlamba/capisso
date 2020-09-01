import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

import { getAllOrganisations } from '../../common/api/organisations';
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

export const OrganisationsViewAllPage: React.FC<{}> = () => {
  const classes = useStyles();

  const [organisations, setOrganisations] = useState<IOrganisationDto[]>([]);

  useEffect(() => {
    getAllOrganisations().then((data) => setOrganisations(data));
  }, []);

  return (
    <div className={classes.content}>
      <p>Welcome to the organisations landing page stub</p>

      <Link to="/organisations/create">+ Add</Link>

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
                  {' '}
                  {row.classifications.join(', ')}{' '}
                </StyledTableCell>
                <StyledTableCell> 0 </StyledTableCell>
                <StyledTableCell> {row.status} </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
