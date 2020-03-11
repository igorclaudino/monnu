import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

let theme: Theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#846DCE'
        },
        secondary: {
            main: '#DBCBD8'
        },

    },
});

theme = responsiveFontSizes(theme);

export default theme;