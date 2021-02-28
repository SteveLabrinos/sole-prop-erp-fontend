import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green } from "@material-ui/core/colors";
import TransactionMaster from './TransactionMaster';
import TransactionDetails from './TransactionDetails';
import TransactionCheckout from './TransactionCheckout';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/2/21.
 */

const useStyles = makeStyles(theme => ({
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
    create: {
        letterSpacing: 1.2,
        backgroundColor: green[500],
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: green[600],
        }
    },
    buttonGroup: {
        marginTop: theme.spacing(5),
    }
}));

function getSteps() {
    return ['Συναλλαγή', 'Υπηρεσίες', 'Σύνοψη'];
}

export default function TransactionStepper(props) {
    const classes = useStyles();
    const { submit, transactionId } = props;

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
                return <TransactionMaster { ...props } />;
            case 1:
                return <TransactionDetails { ...props } />;
            case 2:
                return <TransactionCheckout { ...props } />;
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
                        <div className={classes.buttonGroup}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Επιστροφη
                            </Button>
                            {activeStep !== steps.length -1 ?
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    Επομενο
                                </Button> :
                                transactionId ?
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled
                                        onClick={submit}>
                                        Ενημέρωση Στοιχείων
                                    </Button> :
                                    <Button
                                        variant="contained"
                                        className={classes.create}
                                        onClick={submit}>
                                        Καταχώρηση Εγγραφής
                                    </Button>

                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



