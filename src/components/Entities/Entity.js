import React from 'react';

import EntityHead from './EntityHead';
import EntityBody from './EntityBody';
import EntityButtons from './EntityButtons';
import Card from '@material-ui/core/Card';
import { CardActionArea, Grid } from "@material-ui/core";

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

export default function Entity() {
    return (
        <Card>
            <Grid container>
                <CardActionArea>
                    <Grid item xs={3}>
                        <EntityHead />
                    </Grid>
                    <Grid item container xs={6}>
                        <EntityBody />
                    </Grid>
                </CardActionArea>
                <Grid item xs={3}>
                    <EntityButtons />
                </Grid>
            </Grid>
        </Card>
    );
}