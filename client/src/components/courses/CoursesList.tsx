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
import { ICourseDto } from '../../types/types';

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

export const CoursesList: React.FC<{
  courses: ICourseDto[];
}> = ({ courses }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Course Name </StyledTableCell>
            <StyledTableCell>Code</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((row) => (
            <TableRow
              key={row.id}
              hover={true}
              component={Link}
              to={`/courses/${row.id}/about`}
              classes={{
                root: 'no-underline',
              }}
            >
              <StyledTableCell> {row.name} </StyledTableCell>
              <StyledTableCell> {row.code} </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
