import React from 'react';
import {
  Tooltip,
  withStyles,
  Typography,
  makeStyles,
  IconButton,
  Box,
} from '@material-ui/core';
import { Help, HelpOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  message: {
    margin: '5px 0',
    color: theme.palette.primary.contrastText,
  },
  listItem: {
    margin: '0 15px 5px 40px',
  },
}));

export const UsersUploadHelp: React.FC<{}> = () => {
  const classes = useStyles();

  const HelpTooltip = withStyles((theme) => ({
    tooltip: {
      padding: '15px 15px 15px 5px',
      maxWidth: '440px',
      color: 'rgba(0, 0, 0, 0.87)',
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: '12px',
    },
  }))(Tooltip);

  return (
    <HelpTooltip
      title={
        <>
          <Box display="flex" flexDirection="row" justifyContent="space-evenly">
            <HelpOutline className={classes.message} />
            <Typography variant="h6" className={classes.message}>
              Add many users by uploading a CSV!
            </Typography>
          </Box>
          <ul>
            <li className={classes.listItem}>
              Must have two columns "Email" and "Role" OR a single "Email"
              column
            </li>
            <li className={classes.listItem}>
              The first row is assumed to be for headers and will be ignored
            </li>
            <li className={classes.listItem}>
              Role can be either "Admin" or "User" (will default to "User" if
              empty)
            </li>
          </ul>
        </>
      }
    >
      <IconButton>
        <Help />
      </IconButton>
    </HelpTooltip>
  );
};
