import React from 'react';

import Cockpit from '../../UI/Cockpit/Cockpit';


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

export default function EntityList({token }) {
    console.log('token is:', token);

    //  mapping the different entities of the user
    return (
        <React.Fragment>
            <Cockpit title="Συναλλασόμενοι" />
        </React.Fragment>
    );
}