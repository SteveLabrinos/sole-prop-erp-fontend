import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { invoiceSelector, fetchInvoices } from './invoiceSlice';
import { entitiesSelector, fetchEntitiesCollection } from '../Entity/entitySlice';
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
import Fab from '@material-ui/core/Fab';
import { red } from '@material-ui/core/colors';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import Typography from '@material-ui/core/Typography';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/2/21.
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
    fabRed: {
        color: theme.palette.common.white,
        backgroundColor: red[500],
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: red[600],
        },
    }
}));

export default function InvoiceList({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { invoiceLoading, invoices, statuses } = useSelector(invoiceSelector);
    const { entities } = useSelector(entitiesSelector);

    //  async dispatch to fetch transactions
    const onFetchInvoices = useCallback(() => {
        dispatch(fetchInvoices(token));
    }, [dispatch, token]);
    //  async dispatch to fetch entities
    const onFetchEntities = useCallback(() => {
        dispatch(fetchEntitiesCollection(token));
    }, [dispatch, token]);

    //  fetching the initial transactions from the DB
    useEffect(() => {
        //  populating invoices if the list is empty in the store
        if (invoices.length === 0) {
            onFetchInvoices();
        }
        //  populating entities to get the list if the isn't in the store
        if (entities.length === 0) {
            onFetchEntities();
        }
    }, [entities.length, onFetchEntities, invoices.length, onFetchInvoices]);

    const handleInvoiceFile = id => {
        alert('download pdf from invoice' + id);
    };

    const authRedirect = !token? <Redirect to="auth/sign-in" /> : null;

    //  displaying data, waiting for transactions and entities
    const displayingTransactions = invoiceLoading ?
        <LoadingProgress /> :
        invoices.length === 0 ?
            <Typography
                variant="h5"
                component="p"
                color="textSecondary">
                Δεν βρέθηκαν καταχωρημένα παραστατικά.
            </Typography> :
            <TableContainer component={Paper} className={classes.containerStyle}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">α/α</StyledTableCell>
                            <StyledTableCell align="center">Γραμμή</StyledTableCell>
                            <StyledTableCell align="center">Σημειώσεις</StyledTableCell>
                            <StyledTableCell align="center">Εταιρεία</StyledTableCell>
                            <StyledTableCell align="center">Συνολικό Ποσό</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map(invoice => (
                            <StyledTableRow key={invoice.id}>
                                <TableCell component="th" scope="row" align="center">
                                    {invoice.id}
                                </TableCell>
                                <TableCell align="center">
                                    {invoice.row}
                                </TableCell>
                                <TableCell align="left">
                                    {invoice.notes}
                                </TableCell>
                                <TableCell align="left">
                                    {entities.filter(e => e.id === invoice.transaction.entityId)[0].name}
                                </TableCell>
                                <TableCell align="right">
                                    {`${invoice.transaction.totalPrice}€`}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Παραστατικά" />
            {displayingTransactions}
        </React.Fragment>
    );
}