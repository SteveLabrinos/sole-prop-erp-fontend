import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: green[600],
        },
    },
    cardContent: {
        textAlign: 'center',
    }
}));


export default function EntityButtons() {
    const classes = useStyles();
    return (
        <CardContent className={classes.cardContent}>
            <Fab aria-label="update" className={classes.fabGreen} size="small">
                <EditIcon />
            </Fab>
        </CardContent>
    );
}