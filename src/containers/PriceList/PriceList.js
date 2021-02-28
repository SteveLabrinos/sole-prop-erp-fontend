import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPriceListCollection, priceListSelector } from './priceListSlice';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Cockpit from '../../UI/Cockpit/Cockpit';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 24/2/21.
 */


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles(theme => ({
    containerStyle: {
        marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.down("md")]: {
        containerStyle: {
            marginTop: theme.spacing(2),
        }
    },
    fab: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: green[600],
        },
    }
}));


export default function PriceList({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, priceLists, created } = useSelector(priceListSelector);

    //  async dispatch to fetch entities
    const onFetchPriceLists = useCallback(() => {
        dispatch(fetchPriceListCollection(token));
    }, [dispatch, token]);

    //  apply the entities on the view
    useEffect(() => {
        if (priceLists.length === 0 || created) {
            onFetchPriceLists();
        }
    }, [priceLists.length, onFetchPriceLists, created]);

    const handleUpdatePriceList = id => {
        id ? history.push(`price-lists/update/${id}`) : history.push(`price-lists/new`);
    };

    const authRedirect = !token? <Redirect to="auth/sign-in" /> : null;

    const displayPriceListCollection = loading ?
        <LoadingProgress /> :
        <TableContainer component={Paper} className={classes.containerStyle}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Περιγραφή</StyledTableCell>
                        <StyledTableCell align="center">Κατάσταση</StyledTableCell>
                        <StyledTableCell align="center">Εταιρεία</StyledTableCell>
                        <StyledTableCell align="center">Ενεργός Μέχρι</StyledTableCell>
                        <StyledTableCell align="center">Ημερ/νια Δημιουργίας</StyledTableCell>
                        <StyledTableCell align="center">Επεξεργασία</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {priceLists.map(pr => (
                        <StyledTableRow key={pr.price_list_id}>
                            <TableCell component="th" scope="row">
                                {pr.description}
                            </TableCell>
                            <TableCell align="center">
                                {pr.status_description}
                            </TableCell>
                            <TableCell align="center">
                                {pr.entity}
                            </TableCell>
                            <TableCell align="center">
                                {pr.activity_util}
                            </TableCell>
                            <TableCell align="center">
                                {pr.date_created}
                            </TableCell>
                            <TableCell align="center">
                                <Fab aria-label="update"
                                     onClick={() => handleUpdatePriceList(pr.price_list_id)}
                                     className={classes.fabGreen}
                                     size="small">
                                    <EditIcon />
                                </Fab>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Τιμοκατάλογοι" />
            <Fab color="primary"
                 className={classes.fab}
                 aria-label="add"
                 onClick={() => handleUpdatePriceList(null)} >
                <AddIcon />
            </Fab>
            {displayPriceListCollection}
        </React.Fragment>
    );
}