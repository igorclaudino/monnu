import { makeStyles, Theme, createStyles } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: 'flex',
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1,
            fontSize: 24
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: "wrap"
        },
        button: {
            margin: 10,
            marginTop: 20
        },
        appBar: {
            position: 'relative',
        },
        titleDialog: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    })
);