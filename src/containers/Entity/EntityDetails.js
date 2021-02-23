import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core';

import { baseURL, mapRole, a11yProps } from '../../shared/utility';
import BankAccounts from '../../components/BankAccount/BankAccounts';
import TabPanel from '../../UI/TabPanel/TabPanel';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Cockpit from '../../UI/Cockpit/Cockpit';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ListIcon from '@material-ui/icons/List';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 21/2/21.
 */

const useStyles = makeStyles(theme => ({
    rootContainer: {
        marginTop: theme.spacing(2)
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    titleDisplay: {
        color: theme.palette.primary.light,
        borderBottom: '1px solid #5387db'
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(5)
    },
    tabText: {
        textTransform: 'capitalize'
    }
}));

export default function EntityDetails(props) {
    const classes = useStyles();
    const theme = useTheme();
    const params = useParams();
    const { token } = props;

    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(true);

    const onFetchEntity = useCallback(async () => {
        setLoading(true);
        const response = await fetch(`${baseURL}entity/id/${params.id}/?tokenId=${token}`);

        if (!response.ok) {
            throw Error('Error getting entity: ' + response.status);
        } else {
            const data = await response.json();
            setEntity(data);
            setLoading(false);
            console.log(data);
        }
    }, [token, params.id]);

    useEffect(() => {
        if (!entity && token) {
            onFetchEntity().catch(error => console.log(error));
        }
    }, [token, entity, onFetchEntity]);

    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    //  displaying the view
    const authRedirect = !token ? <Redirect to="auth/sign-in"/> : null;

    const tabs = entity ?
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab
                        label="Τραπεζικοί Λογαριασμοί"
                        className={classes.tabText}
                        {...a11yProps(0)} />
                    <Tab label="Εκπρόσωποι Εταιρείας"
                         className={classes.tabText}
                         {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{ marginBottom: '2rem' }}
            >
                <TabPanel component="div" value={value} index={0} dir={theme.direction}>
                    <BankAccounts accounts={entity.bankAccountList} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Υπάλλοι Εταιρείας - Εφόσον πρόκειται για εταιρεία
                </TabPanel>
            </SwipeableViews>
        </div> : null;


    const displayEntity = loading ?
        <LoadingProgress /> :
        entity ?
            <React.Fragment>
                <Typography variant="h3" component="h2" color="primary" align="center">
                    {entity.name}
                </Typography>
                <Grid container alignItems="center" spacing={3}
                      justify="flex-start" className={classes.rootContainer}>
                    <Grid item xs={6} md={3}>
                        <Typography variant="subtitle1" component="p" className={classes.wrapper}>
                            <AssignmentIndIcon color="secondary" />
                            {mapRole(entity.role)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="subtitle1" component="p" className={classes.wrapper}>
                            <ListIcon color="secondary" />
                            {entity.activity}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>

                        <Link color="primary"
                              variant="subtitle1" href={entity.website} className={classes.wrapper}>
                            <LanguageIcon color="secondary" />
                            {entity.website}
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Link color="primary"
                              variant="subtitle1" href={'tel:' + entity.phoneNumber} className={classes.wrapper}>
                            <PhoneIcon color="secondary" />
                            {entity.phoneNumber}
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={6} container spacing={1}>
                        <Grid xs={12} item>
                            <Typography variant="h6" component="section"
                                        className={classes.titleDisplay}
                                        align="center" color="secondary">
                                Φορολογικά Στοιχεία
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" component="p">
                                {entity.taxId}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" component="p">
                                {entity.taxOffice.code}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} container spacing={1}>
                        <Grid xs={12} item>
                            <Typography variant="h6" component="section"
                                        className={classes.titleDisplay}
                                        align="center" color="secondary">
                                Διεύθυνση
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" component="p">
                                {`${entity.address.street} ${entity.address.streetNumber}, ${entity.address.area}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" component="p">
                                {`${entity.address.city} / ${entity.address.country}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {tabs}
            </React.Fragment> : <div>Δεν βρέθηκαν δεδομένα</div>

    return (
        <React.Fragment>
            <Cockpit title="Στοιχεία Συναλλασομένου" />
            {authRedirect}
            {displayEntity}
        </React.Fragment>
    );
}