import React, { Fragment } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 19/2/2021.
 */

const modal = props => {
    const style = {
        transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
        opacity: props.show ? '1': '0',
    }

    return (
        <Fragment>
            <Backdrop
                show={props.show}
                clicked={props.closeModal}/>
            <div
                className={classes.Modal}
                style={style}>
                {props.children}
            </div>
        </Fragment>
    );
};

export default React.memo(modal);