import React from 'react';
import { makeStyles, Box, Typography, Grid, Paper } from '@material-ui/core';
import { LoginHeader } from '../../components/LoginHeader';
const useStyles = makeStyles((theme) => ({
  content: {
    width: `100%`,
    flexGrow: 1,
  },
}));

export const LoginPage: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Grid
        container={true}
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item={true} xs={3}>
          <Paper elevation={3}>
            <Box padding={2} paddingLeft={4} paddingRight={4}>
              <Typography variant="h3" component="h1">
                Capisso
              </Typography>
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
