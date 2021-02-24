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

    const { entityError, loading, item, created } = useSelector(itemSelector);


    const [values, setValues] = useState({
        item_id: null,
        type_code: '',
        description: '',
        measurement_code: '',
    });

    const handleChange = property => event => {
        if (entityError) dispatch(clearItemError());
        setValues({ ...values, [property]: event.target.value });
    };

    const handleSubmitItem = useCallback(event => {
        event.preventDefault();
        console.log('About to sent this data to the backend');
        console.log(values);
        if (item) {
            dispatch(updateItem(values, token));
            dispatch(clearItem());
        } else {
            dispatch(createNewItem(values, token));
        }

    }, [dispatch, item, token, values]);

    useEffect(() => {
        if (params.id && !item) {
            dispatch(fetchItem(params.id));

        } else if (item) {
            populateFields(item);
        }
    }, [params.id, dispatch, item]);

    const populateFields = item => {
        setValues({
            item_id: item.item_id,
            type_code: item.type_code,
            description: item.description,
            measurement_code: item.measurement_code,
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
                    {item ? 'Επεξεργασία Συναλλασόμενου' :
                        'Δημιουργία Συναλλασόμενου'
                    }
                </Typography>
                {authRedirect}
                {createdRedirect}
                {errorMsg}
                {loading ?
                    <LoadingProgress /> :
                    <ItemForm submit={handleSubmitItem}
                              values={values}
                              item={item}
                              change={handleChange} />
                }
            </div>
        </Container>
    );
}

