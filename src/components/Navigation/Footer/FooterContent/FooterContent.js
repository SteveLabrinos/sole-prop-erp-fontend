import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import classes from './FooterContent.module.css';
import Logo from '../../../../UI/Logo/Logo';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

const footerContent = props => {
    const container = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div className={classes.FooterContent}>
            <Logo logoType="papeiLogo"/>
            <div style={container}>
                <Typography variant="subtitle1" className="p">
                    Ακολουθήστε μας:
                </Typography>
                <Link
                    href="https://github.com/MSc-AIS"
                    target="_blank"
                    rel="noreferrer">
                    <GitHubIcon className={classes.Icon}/>
                </Link>
                <Link
                    href="https://www.facebook.com/groups/1435532373324124"
                    target="_blank"
                    rel="noreferrer">
                    <FacebookIcon className={classes.Icon}/>
                </Link>
            </div>
            <div>
                <Button color="inherit" onClick={props.clicked}>ΠΟΛΙΤΙΚΗ ΑΠΟΡΡΗΤΟΥ</Button>
            </div>
        </div>
    );
}

export default footerContent;