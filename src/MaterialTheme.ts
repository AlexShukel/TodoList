import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: 14,
            },
        },
    },
});
