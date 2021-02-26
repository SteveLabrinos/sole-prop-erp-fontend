import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { addNewEntity, entitiesSelector, updateExistingEntity, clearEntityError } from './entitySlice';
import { Redirect, useParams } from 'react-router';
import { baseURL, mapCodeRole } from '../../shared/utility';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Avatar from '@material-ui/core/Avatar';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';
import EntityForm from './EntityForm';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 21/2/21.
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

export default function EntityCreate({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();

    const { entityError, loading, created } = useSelector(entitiesSelector);

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
            populateFields(data);
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
        zipCode: '',
        city: '',
        area: '',
        countryCode: '',
        // bankAccountList: [],
        companyId: '',
        name: '',
        phone: '',
        role: '',
        taxId: '',
        taxOfficeCode: '',
        website: '',
        type: '',
        email: '',
    });


    const handleChange = property => event => {
        if (errorMsg) dispatch(clearEntityError());
        setValues({ ...values, [property]: event.target.value });
    };

    const populateFields = (entity) => {
        setValues({
            id: entity.id,
            activity: entity.activity,
            street: entity.address.street,
            streetNumber: entity.address.streetNumber,
            zipCode: entity.address.postalCode,
            city: entity.address.city,
            area: entity.address.area,
            countryCode: entity.address.countryCode,
            // bankAccountList: entity.bankAccountList,
            companyId: entity.companyId ? entity.companyId : '',
            name: entity.name,
            phone: entity.phoneNumber,
            role: mapCodeRole(entity.role),
            taxId: entity.taxId,
            taxOfficeCode: entity.taxOffice.code,
            website: entity.website,
            type: entity.type,
            email: entity.email ? entity.email : '',
        });
    };

    const handleSubmitEntity = useCallback(event => {
        event.preventDefault();

        entity ?
            dispatch(updateExistingEntity(values, token)) :
            dispatch(addNewEntity(values, token));

    }, [entity, dispatch, values, token]);

    //  displaying the data
    const errorMsg = entityError ?
        <Typography variant="h5" color="error">
            <ErrorOutlineIcon color="error"/>
            Δεν ήταν δυνατή η εγγραφή. Ελέγξτε τα στοιχεία που δώσατε
        </Typography> : null;

    const authRedirect = !token ?
        <Redirect to="/auth/sign-in"/> : null;

    const createdRedirect = created ?
        <Redirect to="/entities"/> : null;

    return (
        <Container component="main" maxWidth="lg">
            <div className={classes.paper}>
                {entity ?
                    <Avatar className={classes.avatarUpdate}>
                        <EditIcon htmlColor="#fff"/>
                    </Avatar> :
                    <Avatar className={classes.avatarCreate}>
                        <AddIcon htmlColor="#fff"/>
                    </Avatar>
                }
                <Typography component="h1" variant="h5">
                    {entity ? 'Επεξεργασία Συναλλασόμενου' : 'Δημιουργία Συναλλασόμενου'}
                </Typography>
                {authRedirect}
                {createdRedirect}
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