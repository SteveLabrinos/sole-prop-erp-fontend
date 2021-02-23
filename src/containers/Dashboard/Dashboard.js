import React from 'react';

import Cockpit from '../../UI/Cockpit/Cockpit';
import Grid from '@material-ui/core/Grid';

export default function Dashboard () {

    return (
        <React.Fragment>
            <Cockpit title="Αρχική" />
            <Grid container>
                <Grid item xs={12} md={6}>
                    Diagram of incomes over time
                </Grid>
                <Grid item xs={12} md={6}>
                    Table with the 5-10 latest items sold
                </Grid>
                <Grid item xs={12} md={6}>
                    List with 5 most profitable customers
                </Grid>
                <Grid item xs={12} md={6}>
                    Visual Pie with item count as a category
                </Grid>
            </Grid>
        </React.Fragment>
    );
}