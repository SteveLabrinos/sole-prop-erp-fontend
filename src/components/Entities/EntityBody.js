import { mapRole } from '../../shared/utility';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 21/2/21.
 */

export default function EntityBody(props) {
    return(
        <CardContent>
            <Grid container
                  spacing={2}
                  alignItems="center"
                  justify="center">
                <Grid item xs={12} md={6} lg={3} xl={2}>
                    <Typography variant="h6"
                                align="left"
                                color="primary" component="p">
                        {props.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={2}>
                    <Typography variant="subtitle1"
                                color="secondary" component="p">
                        {mapRole(props.role)}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={2}>
                    <Typography variant="subtitle1"
                                color="secondary" component="p">
                        {`${props.address.city}/${props.address.countryCode}`}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={2}>
                    <Link variant="subtitle1"
                          color="secondary" href={'tel:' + props.phoneNumber}>
                        {props.phoneNumber}
                    </Link>
                </Grid>
            </Grid>
        </CardContent>
    );
}