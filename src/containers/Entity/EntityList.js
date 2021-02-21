import React, {useCallback, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { entitiesSelector, fetchEntitiesCollection } from './entitySlice';
import { authTokenSelector } from '../Auth/authSlice';
import Cockpit from '../../UI/Cockpit/Cockpit';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Entity from '../../components/Entities/Entity';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

const useStyles = makeStyles(theme => ({
    containerStyle: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    fab: {
        marginTop: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
        containerStyle: {
            // top: theme.spacing(20)
        }
    },
    entityContainer: {
        width: '100%'
    },
}));

export default function EntityList() {
    //  hook const
    const classes = useStyles();
    const dispatch = useDispatch();

    //  state selectors
    const isAuth = useSelector(authTokenSelector);
    const { entities, loading, entityError } = useSelector(entitiesSelector);

    //  async dispatch to fetch entities
    const onFetchEntities = useCallback(() => {
        dispatch(fetchEntitiesCollection(isAuth));
    }, [dispatch, isAuth]);

    //  apply the entities on the view
    useEffect(() => {
        if (entities.length === 0) {
            setCollectionEmpty(true);
            onFetchEntities();
            setCollectionEmpty(false);
        }
    }, [entities.length, onFetchEntities]);

    //  check for returned empty array
    const [collectionEmpty, setCollectionEmpty] = useState(false);

    const authRedirect = !isAuth? <Redirect to="auth/sign-in" /> : null;

    const entityList = loading ?
        <LoadingProgress /> :
        !collectionEmpty ?
            entities.map(entity => {
                return (
                    <Grid item sx={12} key={entity.id}
                          className={classes.entityContainer}>
                        <Entity {...entity} />
                    </Grid>
                );
            }) :
            <Typography
                variant="h5"
                component="p"
                color="textSecondary">
                Δεν βρέθηκαν συναλλασόμενοι. Προσθέστε έναν νεό συναλλασόμενο
            </Typography>;

    //  mapping the different entities of the user
    return (
        <React.Fragment>
            {authRedirect}
            <Cockpit title="Συναλλασόμενοι" />
            <Fab color="primary"
                 className={classes.fab}
                 aria-label="add">
                <AddIcon />
            </Fab>
            <Grid container spacing={2}
                  justify="center"
                  alignItems="center"
                  className={classes.containerStyle}>
                {entityList}
            </Grid>
        </React.Fragment>
    );
}