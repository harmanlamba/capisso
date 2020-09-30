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
import { ProjectStatusChip } from './ProjectStatusChip';

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

export const ProjectsList: React.FC<{
  projects: IProjectDto[];
}> = ({ projects }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Project Name </StyledTableCell>
            <StyledTableCell>Start Date </StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
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
              <StyledTableCell>
                <ProjectStatusChip status={row.status} />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
