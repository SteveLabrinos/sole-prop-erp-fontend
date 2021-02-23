import { makeStyles } from '@material-ui/core';

import { getFirstLetters } from '../../shared/utility';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 20/2/2021.
 */

const useStyles = makeStyles(theme => ({
    avDisplay: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.main
    }
}));

export default function EntityHead({ name }) {
    const classes = useStyles();

    return (
        <CardContent>
            <Avatar className={classes.avDisplay}>{getFirstLetters(name)}</Avatar>
        </CardContent>
    );
}