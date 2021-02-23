import { Fragment } from 'react';

import Logo from '../../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ScrollTop from '../ScrollTop/ScrollTop';
import { Hidden, makeStyles, AppBar, CssBaseline, Fab } from '@material-ui/core';
import { Toolbar, IconButton, Typography, Grid, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        color: 'white'
    },
    img: {
        height: 80,
        textAlign: 'center',
        flex: 2
    },
    logoStyle: {
        display: 'flex'
    },
    navigationItems: {
        flex: 1,
    },
    logInBtnContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    navigationToolbar: {
        minHeight: '50px'
    }
}));

export default function Navbar(props) {
    const classes = useStyles();
    return (
        <Fragment>
            <AppBar position="sticky">
                <Toolbar className={classes.toolbar} >
                    <CssBaseline />
                     <Grid container spacing={2} justify="space-between" alignItems="center">
                        <Hidden smDown>
                            <Grid item md={5}>
                                <Typography variant="h5" component="h2" className={classes.title}>
                                    Sole Prop ERP
                                </Typography>
                            </Grid>
                        </Hidden>
                         <Hidden mdUp>
                             <Grid item xs={3}>
                                 <IconButton
                                     edge="start"
                                     className={classes.menuButton}
                                     color="inherit"
                                     aria-label="menu"
                                     onClick={props.toggleDrawer}>
                                     <MenuIcon />
                                 </IconButton>
                             </Grid>
                         </Hidden>
                        <Grid item xs={6} md={2} className={classes.logoStyle}>
                            <Typography component="div" className={classes.img}>
                                <Logo logoType="appLogo" />
                            </Typography>
                        </Grid>
                        <Grid item xs={3} md={5} className={classes.logInBtnContainer}>
                            <Button size="large"
                                    onClick={props.clickSignIn}
                                    color="inherit" disableRipple>
                                {props.token ? 'εξοδος' : 'εισοδος'}
                            </Button>
                        </Grid>
                     </Grid>
                </Toolbar>
                <Hidden smDown>
                    <Toolbar className={classes.navigationToolbar}>
                        <Typography component="div" className={classes.navigationItems}>
                            <NavigationItems />
                        </Typography>
                    </Toolbar>
                </Hidden>
            </AppBar>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Fragment>
    );
}