import React from 'react';
import { useHistory } from 'react-router';

import EntityHead from './EntityHead';
import EntityBody from './EntityBody';
import EntityButtons from './EntityButtons';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

export default function Entity(props) {
    const history = useHistory();

    const handleClickDetails = id => {
        history.push(`entities/details/${id}`);
    }

    return (
        <Card>
            <Grid container alignItems="center" justify="center">
                    <Grid item xs={2}>
                        <EntityHead name={props.name} />
                    </Grid>
                    <Grid item container xs={8} alignItems="center">
                        <CardActionArea onClick={() => handleClickDetails(props.id)}>
                            <EntityBody {...props} />
                        </CardActionArea>
                    </Grid>
                <Grid item xs={2}>
                    <EntityButtons />
                </Grid>
            </Grid>
        </Card>
    );
}