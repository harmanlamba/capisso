import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { IOrganisationDto } from '../../types/types';
import { OrganisationStatusChip } from './OrganisationStatusChip';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
    width: '100%',
  },
}));

const StyledTableCell = withStyles((theme) => ({}))(TableCell);

export const OrganisationsList: React.FC<{
  organisations: IOrganisationDto[];
}> = (props) => {
  const classes = useStyles();

  const organisations = props.organisations;

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell> Organisation Name </StyledTableCell>
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
              <StyledTableCell>
                <Typography color="textSecondary" style={{ fontWeight: 500 }}>
                  {row.name}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                {row.classifications.join(', ')}
              </StyledTableCell>
              <StyledTableCell> {row.projectCount} </StyledTableCell>
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
