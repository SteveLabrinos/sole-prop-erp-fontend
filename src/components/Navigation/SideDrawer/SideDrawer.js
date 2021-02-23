import { Fragment } from 'react';

import Logo from '../../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

const sideDrawer = ({ open, closed }) => {
    const attachedClasses = open ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close];

    return (
        <Fragment>
            <Backdrop show={open} clicked={closed} />
            <div className={attachedClasses.join(' ')} onClick={closed}>
                <div className={classes.Logo}>
                    <Logo logoType="appLogo" mobile/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;