import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../UI/Title/Title';
import { Link as RouterLink } from 'react-router-dom';
import { getMonthName } from '../../shared/utility';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 28/2/2021.
 */

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

const getCurrentDate = () => {
    const date = new Date();
    return `${getMonthName(date.getMonth())}, ${date.getFullYear()}`
}

export default function Deposits(props) {
    const classes = useStyles();

    const { title, income } = props;

    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Typography component="p" variant="h4">
                {`${income} €`}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {getCurrentDate()}
            </Typography>
            <div>
                <Link component={RouterLink} color="primary" to="/transactions">
                    Συναλλαγές
                </Link>
            </div>
        </React.Fragment>
    );
}