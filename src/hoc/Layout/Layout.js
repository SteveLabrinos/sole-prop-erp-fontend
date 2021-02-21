import React, { Fragment, useState, memo } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { authTokenSelector } from '../../containers/Auth/authSlice';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Modal from '../../UI/Modal/Modal';
import PrivacyPolicy from '../../components/Navigation/Footer/FooterContent/PrivacyPolicy';
import Footer from '../../components/Navigation/Footer/Footer';
import Container from '@material-ui/core/Container';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

const useStyles = makeStyles(theme => ({
    mainStyled: {
        [theme.breakpoints.up("md")]: {
            marginTop: '1rem',
        }
    }
}));

const Layout = props => {
    const classes = useStyles();
    const history = useHistory();

    const token = useSelector(authTokenSelector);

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const handleSideDrawerClose = () => {
        setSideDrawerIsVisible(false);
    };

    const handleSideDrawerToggle = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    const [privacyVisible, setPrivacyVisible] = useState(false);

    const handlePrivacyClose = () => {
        setPrivacyVisible(false);
    };

    const handlePrivacyOpen = () => {
        setPrivacyVisible(true);
    };

    const handleSignIn = () => {
        history.push(`/auth/sign-${token ? 'out' : 'in'}`);
    };

    return (
        <Fragment>
            <Modal show={privacyVisible} closeModal={handlePrivacyClose}>
                <PrivacyPolicy />
            </Modal>
            <Navbar toggleDrawer={handleSideDrawerToggle}
                    token={token}
                    clickSignIn={handleSignIn} />
            <SideDrawer open={sideDrawerIsVisible} closed={handleSideDrawerClose} />
            <main className={classes.mainStyled}>
                <Container maxWidth="lg">
                    {props.children}
                </Container>
            </main>
            <Footer showPrivacy={handlePrivacyOpen} />
        </Fragment>
    );
};

export default memo(Layout);

