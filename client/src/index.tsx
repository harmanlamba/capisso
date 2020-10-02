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
    secondary: {
      main: '#ffdbcc',
      contrastText: '#727272',
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
    text: {
      secondary: '#5c90f7',
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
      containedSecondary: {
        '&:hover': {
          backgroundColor: '#fcb292',
          color: '#fff',
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
        padding: 12,
      },
      head: {
        borderBottom: '0',
        borderRadius: '20px !important',
        fontSize: 17,
        fontWeight: 500,
      },
    },

    // Chip
    MuiChip: {
      colorPrimary: {
        backgroundColor: '#deffde',
        color: '#212121',
      },
    },

    // Tabs
    MuiTabs: {
      root: {
        fontSize: 16,
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'center',
      },
      indicator: {
        backgroundColor: '#5c90f7',
        height: 4,
        maxWidth: 100,
        marginRight: 30,
        marginLeft: 30,
      },
    },
    MuiTab: {
      root: {
        fontWeight: 500,
        fontSize: 16,
      },
    },

    // list item
    MuiListItem: {
      root: {
        '& .MuiListItemIcon-root': {
          color: 'inherit',
        },
        borderRadius: 20,
        '&$selected:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        '&$selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      },
    },

    // Form
    MuiTextField: {
      root: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        boxShadow: '0px 3px 3px rgba(0,0,0,0.2)',
        borderRadius: 10,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      },
    },

    MuiFilledInput: {
      root: {
        backgroundColor: '#fff',

        '&.Mui-focused': {
          backgroundColor: '#fff',
        },
        '&:hover': {
          backgroundColor: '#fff',
        },
      },
      underline: {
        '&:before': {
          borderBottom: 0,
        },
        '&:after': {
          borderBottom: '2px solid #5c90f7',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: 0,
        },
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
