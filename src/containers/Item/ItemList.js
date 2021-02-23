import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchItemCollection, itemSelector } from './itemSlice';
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
 * @author Stavros Labrinos [stalab at linuxmail.org] on 23/2/21.
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


export default function ItemList({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { loading, items } = useSelector(itemSelector);

    //  async dispatch to fetch entities
    const onFetchItems = useCallback(() => {
        dispatch(fetchItemCollection(token));
    }, [dispatch, token]);

    //  apply the entities on the view
    useEffect(() => {
        if (items.length === 0) {
            onFetchItems();
        }
    }, [items.length, onFetchItems]);

    const authRedirect = !token? <Redirect to="auth/sign-in" /> : null;

    const displayItemList = loading ?
        <LoadingProgress /> :
        <TableContainer component={Paper} className={classes.containerStyle}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Περιγραφή</StyledTableCell>
                        <StyledTableCell align="center">Τύπος</StyledTableCell>
                        <StyledTableCell align="center">Μονάδα Μέτρησης</StyledTableCell>
                        <StyledTableCell align="center">Ημερ/νια Δημιουργίας</StyledTableCell>
                        <StyledTableCell align="center">Ημερ/νια Πρώτης Πώλησης</StyledTableCell>
                        <StyledTableCell align="center">Επεξεργασία</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <StyledTableRow key={item.item_id}>
                            <TableCell component="th" scope="row">
                                {item.description}
                            </TableCell>
                            <TableCell align="center">
                                {item.type_code}
                            </TableCell>
                            <TableCell align="center">
                                {item.measurement_code}
                            </TableCell>
                            <TableCell align="center">
                                {item.date_created}
                            </TableCell>
                            <TableCell align="center">
                                {item.date_first_sold}
                            </TableCell>
                            <TableCell align="center">
                                <Fab aria-label="update"
                                     onClick={() => alert(item.item_id)}
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
            <Cockpit title="Υπηρεσίες" />
            <Fab color="primary"
                 className={classes.fab}
                 aria-label="add"
                 onClick={() => alert('crete item')} >
                <AddIcon />
            </Fab>
            {displayItemList}
        </React.Fragment>
    );
}