import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 750,
            md: 1100,
            lg: 1450,
            xl: 2150,
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
