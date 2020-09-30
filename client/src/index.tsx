import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e2ebfc',
      contrastText: '#5c90f7',
    },
  },
});

const capissoTheme = createMuiTheme({
  palette: {},
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 20, // square corners
        textTransform: 'none', // removes uppercase transformation
      },
      containedPrimary: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,

        '&:hover': {
          // changes colors for hover state
          backgroundColor: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
        },
      },
    },
  },
  typography: {
    body2: { fontSize: 20 },
    fontFamily: ['Signika', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={capissoTheme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
