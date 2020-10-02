import React from 'react';
import { makeStyles, Box, Typography, Grid, Paper } from '@material-ui/core';
import Logo from '../../assets/Logo';
import { LoginHeader } from '../../components/LoginHeader';
import './login.css';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `100%`,
    flexGrow: 1,
    backgroundColor: '#821124',
  },
  titleButton: {
    fontSize: '1.25em',
    fontWeight: 'bold',
    backgroundColor: 'transparent !important',
  },
}));

export const LoginPage: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <ul className="squares">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
      <Grid
        container={true}
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item={true} xs={3}>
          <Paper elevation={5}>
            <Box padding={3} paddingLeft={4} paddingRight={4}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.titleButton}
              >
                <Logo />
                <Typography
                  style={{ marginLeft: 5 }}
                  variant="h3"
                  component="h1"
                >
                  Capisso
                </Typography>
              </Box>
              <Box marginTop={2}>
                <Typography
                  style={{ marginLeft: 5 }}
                  variant="h6"
                  component="h1"
                >
                  Welcome to your contact management tool. Let's get started!
                </Typography>
              </Box>

              <Box marginTop={2}>
                <LoginHeader />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
