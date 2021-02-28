import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PriceListMasterUpdate from './PriceListMasterUpdate';
import PriceListDetails from './PriceListDetails';
import PriceListCheckout from './PriceListCheckout';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 26/2/21.
 */

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Στοιχεία Τιμοκαταλόγου', 'Εισαγωγή Υπηρεσιών', 'Σύνοψη'];
}

export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    // const { submit } = props;

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <PriceListMasterUpdate {...props} />;
            case 1:
                return <PriceListDetails {...props} />;
            case 2:
                return <PriceListCheckout {...props} />;
            default:
                return 'Άγνωστο βήμα οδηγού';
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>Ολοκλήρωση βημάτων</Typography>
                        <Button onClick={handleReset}>Ακύρωση</Button>
                    </div>
                ) : (
                    <div>
                        <Typography component="div" className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Επιστροφη
                                </Button>
                                {activeStep === steps.length -1 ?
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => alert('post to backend')}>
                                        Αποθηκευση
                                    </Button> :
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        Επομενο
                                    </Button>
                                }
                            </div>
                    </div>
                )}
            </div>
        </div>
    );
}



