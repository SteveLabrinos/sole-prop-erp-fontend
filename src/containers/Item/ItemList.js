import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import itemListJson from '../../assets/statics/itemList.json';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import React from 'react';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Cockpit from '../../UI/Cockpit/Cockpit';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import {green} from "@material-ui/core/colors";


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

    //  temp
    const loading = false;

    const authRedirect = !token? <Redirect to="auth/sign-in" /> : null;

    //  static data
    const itemList = Object.values(itemListJson);

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
                    {itemList.map(item => (
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
            {displayItemList}
        </React.Fragment>
    );
}