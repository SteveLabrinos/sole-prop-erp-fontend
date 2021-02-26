import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';

import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { itemSelector, clearItemError, fetchItem,
    createNewItem, updateItem, clearItem } from './itemSlice';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import ItemForm from './ItemForm';
import Container from '@material-ui/core/Container';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 23/2/21.
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

export default function ItemCreate({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();

    const { entityError, loading, item, created, itemTypes, measurementCodes } = useSelector(itemSelector);

    const [itemId, setItemId] = useState(null);

    const [values, setValues] = useState({
        typeCode: '',
        description: '',
        measurementCode: '',
    });

    const handleChange = property => event => {
        if (entityError) dispatch(clearItemError());
        setValues({ ...values, [property]: event.target.value });
    };

    const handleSubmitItem = useCallback(event => {
        event.preventDefault();
        if (item) {
            dispatch(updateItem(values, itemId, token));
            dispatch(clearItem());
        } else {
            dispatch(createNewItem(values, token));
        }

    }, [itemId, dispatch, item, token, values]);

    useEffect(() => {
        if (params.id && !item) {
            setItemId(params.id);
            dispatch(fetchItem(itemId));

        } else if (item) {
            populateFields(item);
        }
    }, [itemId, params.id, dispatch, item]);

    const populateFields = item => {
        setItemId(item.id);
        setValues({
            typeCode: item.typeCode,
            description: item.description,
            measurementCode: item.measurementCode,
        });
    };

    //  display data
    const errorMsg = entityError ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon color="error"/>
            Δεν ήταν δυνατή η εγγραφή. Ελέγξτε τα στοιχεία που δώσατε
        </Typography> : null;

    const authRedirect = !token ?
        <Redirect to="/auth/sign-in"/> : null;

    const createdRedirect = created ?
        <Redirect to="/items"/> : null;

    return (
        <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
                {item ?
                    <Avatar className={classes.avatarUpdate}>
                        <EditIcon htmlColor="#fff"/>
                    </Avatar> :
                    <Avatar className={classes.avatarCreate}>
                        <AddIcon htmlColor="#fff"/>
                    </Avatar>
                }
                <Typography component="h1" variant="h5">
                    {item ? 'Επεξεργασία Υπηρεσίας' :
                        'Δημιουργία Υπηρεσίας'
                    }
                </Typography>
                {authRedirect}
                {createdRedirect}
                {errorMsg}
                {loading ?
                    <LoadingProgress /> :
                    <ItemForm submit={handleSubmitItem}
                              id={itemId}
                              values={values}
                              item={item}
                              itemTypes={itemTypes}
                              measurementCodes={measurementCodes}
                              change={handleChange} />
                }
            </div>
        </Container>
    );
}

