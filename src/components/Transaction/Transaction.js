import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { entitiesSelector, fetchEntitiesCollection } from '../../containers/Entity/entitySlice';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import { transactionSelector } from '../../containers/Transaction/transactionSlice';
import Divider from '@material-ui/core/Divider';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 27/2/21.
 */

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    },
    cardContainer: {
        marginBottom: theme.spacing(3)
    },
    table: {
        minWidth: 650,
    },
}));


export default function Transaction({ transaction, token }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { entities } = useSelector(entitiesSelector);
    const { paymentTerms, statuses } = useSelector(transactionSelector);

    console.log(transaction);

    //  async dispatch to fetch entities if they don't exist
    const onFetchEntities = useCallback(() => {
        dispatch(fetchEntitiesCollection(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (entities.length === 0) {
            onFetchEntities();
        }
    }, [entities.length, onFetchEntities]);

    const displayTransaction = entities.length === 0 ?
        <LoadingProgress /> :
        <Card className={classes.cardContainer}>
            <CardHeader
                title={transaction.title}
                titleTypographyProps={{ align: 'center' }}
                className={classes.cardHeader} />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="p" color="primary">
                            {entities.filter(e => e.id === transaction.entityId)[0].name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="subtitle1" component="p">
                            {`Αριθμός Συναλλαγής: ${transaction.orderNumber}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="subtitle1" component="p">
                            {`Συνολικό Ποσό: ${Number(transaction.totalPrice).toFixed(2)} €`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" component="p">
                            {`Όροι Πληρωμής: ${paymentTerms
                                .filter(t => t.code === transaction.paymentTerms)[0].value}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" component="p">
                            {`Όροι Πληρωμής: ${statuses
                                .filter(t => t.code === transaction.status)[0].value}`}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardContent>
                <TableContainer>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Υλικό</TableCell>
                                <TableCell align="right">Τιμή/Μονάδα</TableCell>
                                <TableCell align="right">Ποσότητα</TableCell>
                                <TableCell align="right">Έκπτωση</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transaction.itemTransactionList.map(item => (
                                <TableRow key={item.transactionId}>
                                    <TableCell component="th" scope="row">
                                        {item.item.description}
                                    </TableCell>
                                    <TableCell align="right">{`${item.unitPrice}€`}</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{`${item.discount ? item.discount + '%' : '-'}`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>

    return (
        displayTransaction
    );
}