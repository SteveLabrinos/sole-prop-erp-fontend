import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from "react";
import { addNewEntity, entitiesSelector } from './entitySlice';
import { Redirect, useParams } from 'react-router';
import { baseURL } from '../../shared/utility';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Avatar from '@material-ui/core/Avatar';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import EntityForm from './EntityForm';



const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    link: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
}));

export default function EntityCreate({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();

    const { entityError, loading } = useSelector(entitiesSelector);

    //  getting entity data if the call is for update
    const [entity, setEntity] = useState(null);
    const entityId = params.id;

    const onFetchEntity = useCallback(async () => {
        const response = await fetch(`${baseURL}entity/id/${entityId}/?tokenId=${token}`);

        if (!response.ok) {
            throw Error('Error getting entity: ' + response.status);
        } else {
            const data = await response.json();
            setEntity(data);
        }
    }, [token, entityId]);

    useEffect(() => {
        if (entityId) {
            onFetchEntity().catch(error => console.log(error));
        }
    }, [entityId, onFetchEntity]);

    const [values, setValues] = useState({
        id: null,
        activity: '',
        street: '',
        streetNumber: '',
        city: '',
        area: '',
        country: '',
        bankAccountList: [],
        companyId: '',
        name: '',
        phoneNumber: '',
        role: '',
        taxId: '',
        code: '',
        website: ''
    });

    const handleChange = property => event => {
        setValues({ ...values, [property]: event.target.value });
    };

    const handleSubmitEntity = useCallback(event => {
        event.preventDefault();
        console.log('About to sent this data to the backend');
        console.log(values);
        dispatch(addNewEntity(values, token));
    }, [dispatch, values, token]);

    //  displaying the data
    const errorMsg = entityError ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon color="error"/>
            Δεν ήταν δυνατή η εγγραφή. Ελέγξτε τα στοιχεία που δώσατε
        </Typography> : null;

    const authRedirect = !token ?
        <Redirect to="/auth/sign-in"/> : null;


    return (
        <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EditIcon htmlColor="#fff"/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {entity ? 'Επεξεργασία Συναλλασόμενου' : 'Δημιουργία Συναλλασόμενου'}
                </Typography>
                {authRedirect}
                {errorMsg}
                {loading ?
                    <LoadingProgress /> :
                    <EntityForm submit={handleSubmitEntity}
                                values={values} entity={entity}
                                change={handleChange} />
                }
            </div>
        </Container>
    );
}