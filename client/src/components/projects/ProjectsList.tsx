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
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProjectDto } from '../../types/types';

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

export const ProjectsList: React.FC<{
  projects: IProjectDto[];
}> = ({ projects }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell> Project Name </StyledTableCell>
            <StyledTableCell> Start Date </StyledTableCell>
            <StyledTableCell> Outcome </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow
              key={row.id}
              hover={true}
              component={Link}
              to={`/projects/${row.id}/about`}
              classes={{
                root: 'no-underline',
              }}
            >
              <StyledTableCell> {row.title} </StyledTableCell>
              <StyledTableCell>
                {moment(row.startDate).format('YYYY-MM-DD')}
              </StyledTableCell>
              <StyledTableCell>{row.outcome}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
