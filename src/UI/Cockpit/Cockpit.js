import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import classes from './Cockpit.module.css';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

const cockpit = ({ title }) => {


    return (
        //  temp disable cockpit title
        <Hidden mdDown>
            <Typography className={classes.Title}
                variant="h5"
                component="h2"
                style={{ marginBottom: '1rem' }}
                id="back-to-top-anchor"
                color="textPrimary">
                {title}
            </Typography>
        </Hidden>
    );
}

export default cockpit;