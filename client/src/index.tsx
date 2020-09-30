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
  palette: {
    primary: {
      main: '#e2ebfc',
      contrastText: '#5c90f7',
    },
    secondary: {
      main: '#ffdbcc',
      contrastText: '#727272',
    },
  },
  overrides: {
    // Button
    MuiButton: {
      root: {
        borderRadius: 10,
        textTransform: 'none',
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
        },
      },
    },

    // Table
    MuiTableHead: {
      root: {
        backgroundColor: theme.palette.common.white,
        borderRadius: '20px !important',
        boxShadow: '0px 3px 3px rgba(0,0,0,0.2)',
      },
    },
    MuiTableRow: {
      root: {
        background: 'rgba(255,255,255,0)',
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '2px solid rgba(224,224,224,1)',
        height: 32,
      },
      head: {
        borderBottom: '0',
        borderRadius: '20px !important',
      },
    },
  },
  typography: {
    fontFamily: ['Signika', 'sans-serif'].join(','),
    body1: {
      fontSize: 18,
    },
    body2: {
      fontSize: 15,
    },
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
