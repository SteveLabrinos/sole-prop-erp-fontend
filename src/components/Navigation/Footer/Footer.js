import classes from './Footer.module.css';
import FooterContent from './FooterContent/FooterContent';
import Copyright from './Copyright';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 19/2/2021.
 */

const footer = props => (
    <footer className={classes.Footer}>
        <FooterContent clicked={props.showPrivacy}/>
        <Copyright />
    </footer>
);

export default footer;