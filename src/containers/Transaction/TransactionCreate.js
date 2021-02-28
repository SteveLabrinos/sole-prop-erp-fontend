import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { transactionSelector, clearError } from './transactionSlice';
import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { fetchItemCollection, itemSelector } from '../Item/itemSlice';
import { baseURL } from '../../shared/utility';
import { entitiesSelector, fetchEntitiesCollection } from '../Entity/entitySlice';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import TransactionStepper from './TransactionStepper';
import Container from '@material-ui/core/Container';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 27/2/21.
 */

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatarUpdate: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    avatarCreate: {
        margin: theme.spacing(1),
        backgroundColor: green[500],
    },
    link: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
}));

export default function TransactionCreate({ token }) {
    const classes = useStyles();
    const params = useParams();
    const dispatch = useDispatch();

    const { error, processed } = useSelector(transactionSelector);
    const { items } = useSelector(itemSelector);
    const { entities } = useSelector(entitiesSelector);

    //  populate store with items and entities if they are empty
    const onFetchEntities = useCallback(() => {
        dispatch(fetchEntitiesCollection(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (entities.length === 0) {
            onFetchEntities();
        }
    }, [entities.length, onFetchEntities]);

    const onFetchItems = useCallback(() => {
        dispatch(fetchItemCollection(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (items.length === 0) {
            onFetchItems();
        }
    }, [items.length, onFetchItems]);

    //  id stands for update existing transaction
    const transactionId = params.id ? params.id : null;

    //  root values of the form
    const [values, setValues] = useState({
        entityId: '',
        title: '',
        orderNumber: '',
        companyFlag: '0',
        paymentTerms: '',
        status: '',
        notes: '',
        transactionItemList: [],
    });

    const handleChange = property => event => {
        if (error) dispatch(clearError());
        setValues({ ...values, [property]: event.target.value });
    };

    //  nested values for the transaction items
    const [transactionItemValues, setTransactionItemValues] = useState({
        itemId: '',
        unitPrice: '',
        discount: '',
        quantity: '',
    });

    const handleTransactionItemChange = property => event => {
        setTransactionItemValues({ ...transactionItemValues, [property]: event.target.value });
    };

    //  insert or update forms data
    const handleSubmitTransaction = useCallback(() => {
        console.log('about to send data to the backend');
        console.log(values);
    });

    //  loading progress if there are values to be retrieved
    const [loading, setLoading] = useState(false);

    //  getting the transaction from the DB for update
    const onFetchTransaction = useCallback(async () => {
        setLoading(true);

        const response = await fetch(`${baseURL}transaction/id/${transactionId}?tokenId=${token}`);

        if (response.ok) {
            const data = await response.json();
            populateFields(data);
            setLoading(false);
        } else {
            throw Error('Problem accessing transaction');
        }

    }, [token, transactionId]);

    //  get Transaction on initialization
    useEffect(() => {
        if(transactionId && !processed) {
            onFetchTransaction().catch(error => console.log(error));
        }
    }, [processed, transactionId, onFetchTransaction, token]);

    const populateFields = transaction => {
        setValues({
            entityId: transaction.entityId,
            title: transaction.title,
            orderNumber: transaction.orderNumber,
            companyFlag: transaction.companyFlag,
            paymentTerms: transaction.paymentTerms,
            status: transaction.status,
            notes: transaction.notes,
            transactionItemList: transaction.transactionItemList,
        });
    };

    //  display data
    const errorMsg = error ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon color="error"/>
            Δεν ήταν δυνατή η εγγραφή. Ελέγξτε τα στοιχεία που δώσατε
        </Typography> : null;

    const authRedirect = !token ? <Redirect to="/auth/sign-in"/> : null;

    const processedRedirect = processed ? <Redirect to="/price-lists"/> : null;

    return loading ?
        <LoadingProgress /> :
        <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
                {transactionId ?
                    <Avatar className={classes.avatarUpdate}>
                        <EditIcon htmlColor="#fff"/>
                    </Avatar> :
                    <Avatar className={classes.avatarCreate}>
                        <AddIcon htmlColor="#fff"/>
                    </Avatar>
                }
                <Typography component="h1" variant="h5">
                    {transactionId ? 'Επεξεργασία Συναλλαγής' :
                        'Δημιουργία Συναλλαγής'
                    }
                </Typography>
                {authRedirect}
                {processedRedirect}
                {errorMsg}
                <TransactionStepper
                    entities={entities}
                    items={items}
                    submit={handleSubmitTransaction}
                    values={values}
                    transactionId={transactionId}
                    setValues={setValues}
                    transactionItemValues={transactionItemValues}
                    setTransactionItemValues={setTransactionItemValues}
                    handleTransactionItemChange={handleTransactionItemChange}
                    change={handleChange} />
            </div>
        </Container>
}