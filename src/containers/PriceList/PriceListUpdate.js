import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';

import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { priceListSelector, clearPriceListError, updateExistingPriceList,
    clearPriceList, fetchExistingPriceList, createPriceList } from './priceListSlice';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import PriceListStepper from './PriceListStepper';
import Container from '@material-ui/core/Container';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 24/2/21.
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

export default function PriceListUpdate({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, priceList, created, priceListError } = useSelector(priceListSelector)

    const [values, setValues] = useState({
        price_list_id: null,
        description: '',
        date_created: '',
        status_code: '',
        active_until: new Date()
            .toISOString().replace(/T.*/, '')
            .split('-').join('-'),
        entity_id: '',
        list_items: []
    });

    const [itemListValues, setItemListValues] = useState({
        item_id: '',
        price: '',
    });

    const handleItemChange = property => event => {
        setItemListValues({ ...itemListValues, [property]: event.target.value });
    };

    const handleChange = property => event => {
        if (priceListError) dispatch(clearPriceListError());
        setValues({ ...values, [property]: event.target.value });
        console.log(values);
    };

    const handleSubmitPriceList = useCallback(event => {
        event.preventDefault();
        console.log('About to sent this data to the backend');
        console.log(values);
        if (priceList) {
            dispatch(updateExistingPriceList(values, token));
            dispatch(clearPriceList());
        } else {
            dispatch(createPriceList(values, token));
        }

    }, [dispatch, priceList, token, values]);

    useEffect(() => {
        if (params.id && !priceList) {
            dispatch(fetchExistingPriceList(params.id, token));

        } else if (priceList) {
            populateFields(priceList);
        }
    }, [params.id, dispatch, priceList, token]);

    const populateFields = priceList => {
        setValues({
            price_list_id: priceList.item_id,
            description: priceList.type_code,
            date_created: priceList.description,
            status_code: priceList.status_code,
            active_until: priceList.active_until,
            entity_id: priceList.entity_id,
            list_items: priceList.list_items
        });
    };

    //  display data
    const errorMsg = priceListError ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon color="error"/>
            Δεν ήταν δυνατή η εγγραφή. Ελέγξτε τα στοιχεία που δώσατε
        </Typography> : null;

    const authRedirect = !token ?
        <Redirect to="/auth/sign-in"/> : null;

    const createdRedirect = created ?
        <Redirect to="/price-lists"/> : null;

    return (
        <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
                {priceList ?
                    <Avatar className={classes.avatarUpdate}>
                        <EditIcon htmlColor="#fff"/>
                    </Avatar> :
                    <Avatar className={classes.avatarCreate}>
                        <AddIcon htmlColor="#fff"/>
                    </Avatar>
                }
                <Typography component="h1" variant="h5">
                    {priceList ? 'Επεξεργασία Τιμοκαταλόγου' :
                        'Δημιουργία Τιμοκαταλόγου'
                    }
                </Typography>
                {authRedirect}
                {createdRedirect}
                {errorMsg}
                {loading ?
                    <LoadingProgress /> :
                    <PriceListStepper submit={handleSubmitPriceList}
                              values={values}
                              setValues={setValues}
                              priceList={priceList}
                              itemListValues={itemListValues}
                              setItemListValues={setItemListValues}
                              itemListChange={handleItemChange}
                              change={handleChange} />
                }
            </div>
        </Container>
    );
}

