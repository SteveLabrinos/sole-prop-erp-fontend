import { createMuiTheme } from '@material-ui/core';

/** @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.*/

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#035ba9',
            light: '#5387db',
            dark: '#003379',
            contrastText: '#ede7f6'
        },
        secondary: {
            light: '#afafaf',
            main: '#808080',
            dark: '#545454',
            contrastText: '#ede7f6',

        }
    }
});