import React, {useCallback, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';

import { transactionSelector, fetchTransactions } from './transactionSlice';
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
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 27/2/21.
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

export default function TransactionList({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, transactions, processed, paymentTerms, statuses } = useSelector(transactionSelector);
    const { entities } = useSelector(entitiesSelector);

    //  async dispatch to fetch transactions
    const onFetchTransactions = useCallback(() => {
        dispatch(fetchTransactions(token));
    }, [dispatch, token]);
    //  async dispatch to fetch entities
    const onFetchEntities = useCallback(() => {
        dispatch(fetchEntitiesCollection(token));
    }, [dispatch, token]);

    //  fetching the initial transactions from the DB
    useEffect(() => {
        //  populating transactions if the list is empty in the store
        if (transactions.length === 0 || processed) {
            //  populating entities to get the list if the isn't in the store
            if (entities.length === 0) {
                onFetchEntities();
            }
            onFetchTransactions();
        }
    }, [entities.length, onFetchEntities, transactions.length, onFetchTransactions, processed]);

    const handleUpdateTransaction = id => {
        id ? history.push(`/transactions/update/${id}`) : history.push(`/transactions/new`);
    };

    const handleTransactionReport = id => {
        history.push(`/transactions/${id}`);
    };

    const authRedirect = !token? <Redirect to="auth/sign-in" /> : null;

    //  displaying data, waiting for transactions and entities
    const displayingTransactions = loading ?
        <LoadingProgress /> :
        entities.length === 0 ?
            <LoadingProgress /> :
            <TableContainer component={Paper} className={classes.containerStyle}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Συναλλασόμενος</StyledTableCell>
                            <StyledTableCell align="center">Περιγραφή</StyledTableCell>
                            <StyledTableCell align="center">α/α Συναλλαγής</StyledTableCell>
                            <StyledTableCell align="center">Ημερομηνία</StyledTableCell>
                            <StyledTableCell align="center">Τρόπος Πληρωμής</StyledTableCell>
                            <StyledTableCell align="center">Συνολικό Ποσό</StyledTableCell>
                            <StyledTableCell align="center">Κατάσταση</StyledTableCell>
                            <StyledTableCell align="center">Ανάλυση</StyledTableCell>
                            <StyledTableCell align="center">Επεξεργασία</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map(tr => (
                            <StyledTableRow key={tr.id}>
                                <TableCell component="th" scope="row">
                                    {entities.filter(e => e.id === tr.entityId)[0].name}
                                </TableCell>
                                <TableCell align="left">
                                    {tr.title}
                                </TableCell>
                                <TableCell align="center">
                                    {tr.orderNumber}
                                </TableCell>
                                <TableCell align="center">
                                    {tr.createdDate}
                                </TableCell>
                                <TableCell align="center">
                                    {paymentTerms.filter(t => t.code === tr.paymentTerms)[0].value}
                                </TableCell>
                                <TableCell align="right">
                                    {`${Number(tr.totalPrice).toFixed(2)} €`}
                                </TableCell>
                                <TableCell align="center">
                                    {statuses.filter(s => s.code === tr.status)[0].value}
                                </TableCell>
                                <TableCell align="center">
                                    <Fab aria-label="report"
                                         color="primary"
                                         onClick={() => handleTransactionReport(tr.id)}
                                         size="small">
                                        <VisibilityIcon />
                                    </Fab>
                                </TableCell>
                                <TableCell align="center">
                                    <Fab aria-label="update"
                                         onClick={() => handleUpdateTransaction(tr.id)}
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
            <Cockpit title="Συναλλαγές" />
            <Fab color="primary"
                 className={classes.fab}
                 aria-label="add"
                 onClick={() => handleUpdateTransaction(null)} >
                <AddIcon />
            </Fab>
            {displayingTransactions}
        </React.Fragment>
    );
}