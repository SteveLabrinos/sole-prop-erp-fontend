import { Fragment } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/01/21.
 */

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const LoadingProgress = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.root}>
                <LinearProgress color="secondary"/>
                <LinearProgress />
            </div>
        </Fragment>
    );
};

export default LoadingProgress;