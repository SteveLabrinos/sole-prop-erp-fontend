import classes from './Backdrop.module.css';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/02/21.
 */


const CustomBackdrop = props => {

    return (
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
    );
};

export default CustomBackdrop;