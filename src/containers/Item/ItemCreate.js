import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';

import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { itemSelector, clearItemError, fetchItem, deleteExistingItem,
    createNewItem, updateExistingItem } from './itemSlice';
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

    const { entityError, loading, selectedItem, created,
        itemTypes, measurementCodes } = useSelector(itemSelector);

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
        if (selectedItem) {
            dispatch(updateExistingItem(values, itemId, token));
        } else {
            dispatch(createNewItem(values, token));
        }

    }, [itemId, dispatch, selectedItem, token, values]);

    const handleDeleteItem = useCallback(event => {
        event.preventDefault();

        dispatch(deleteExistingItem(itemId, token));
    }, [dispatch, itemId, token]);

    useEffect(() => {
        if (params.id && !selectedItem && !created) {
            setItemId(params.id);
            dispatch(fetchItem(params.id));

        } else if (selectedItem) {
            populateFields(selectedItem);
        }
    }, [created, itemId, params.id, dispatch, selectedItem]);

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
                {selectedItem ?
                    <Avatar className={classes.avatarUpdate}>
                        <EditIcon htmlColor="#fff"/>
                    </Avatar> :
                    <Avatar className={classes.avatarCreate}>
                        <AddIcon htmlColor="#fff"/>
                    </Avatar>
                }
                <Typography component="h1" variant="h5">
                    {selectedItem ? 'Επεξεργασία Υπηρεσίας' :
                        'Δημιουργία Υπηρεσίας'
                    }
                </Typography>
                {authRedirect}
                {createdRedirect}
                {errorMsg}
                {loading ?
                    <LoadingProgress /> :
                    <ItemForm submit={handleSubmitItem}
                              deleteItem={handleDeleteItem}
                              id={itemId}
                              values={values}
                              selectedItem={selectedItem}
                              itemTypes={itemTypes}
                              measurementCodes={measurementCodes}
                              change={handleChange} />
                }
            </div>
        </Container>
    );
}

