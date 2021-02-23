import { makeStyles } from '@material-ui/core';
import React  from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel'


/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 21/2/21.
 */


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 250,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize'
    },
    create: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize',
        backgroundColor: green[500],
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: green[600],
        }
    },
    error: {
        letterSpacing: 1.2,
        marginTop: theme.spacing(2),
        textTransform: 'capitalize',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    }
}));

export default function EntityForm(props) {
    const classes = useStyles();
    const {values, submit, change, entity } = props;

    return (
        <form className={classes.form} onSubmit={submit}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        label="Όνομα"
                        name="name"
                        placeholder="Συμπληρώστε Όνομα"
                        autoComplete="name"
                        value={values.name}
                        autoFocus
                        onChange={change('name')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-role-label">Ρόλος</InputLabel>
                        <Select
                            labelId="select-role-label"
                            id="select-role"
                            required
                            fullWidth
                            value={values.role}
                            onChange={change('role')}
                        >
                            <MenuItem value="">
                                <em>Επιλέξτε</em>
                            </MenuItem>
                            <MenuItem value={'C'}>Πελάτης</MenuItem>
                            <MenuItem value={'S'}>Προμηθευτής</MenuItem>
                            <MenuItem value={'B'}>Πελάτης & Προμήθευτής</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        id="phone"
                        label="Τηλέφωνο"
                        name="phone"
                        value={values.phone}
                        placeholder="Συμπληρώστε Τηλέφωνο"
                        onChange={change('phoneNumber')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        id="website"
                        label="Ιστότοπος"
                        name="website"
                        value={values.website}
                        placeholder="Συμπληρώστε Ιστότοπο"
                        onChange={change('website')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        id="street"
                        label="Οδός"
                        name="street"
                        value={values.street}
                        autoComplete="street"
                        placeholder="Συμπληρώστε Οδό"
                        onChange={change('street')}
                    />
                </Grid>
                <Grid item xs={4} sm={2} md={3} lg={2}>
                    <TextField
                        fullWidth
                        id="streetNumber"
                        label="Αριθμός"
                        name="streetNumber"
                        value={values.streetNumber}
                        autoComplete="streetNumber"
                        placeholder="Αριθμό"
                        onChange={change('streetNumber')}
                    />
                </Grid>
                <Grid item xs={8} sm={4} md={5} lg={4}>
                    <TextField
                        fullWidth
                        id="area"
                        label="Περιοχή"
                        name="area"
                        value={values.area}
                        autoComplete="area"
                        placeholder="Συμπληρώστε Περιοχή"
                        onChange={change('area')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        id="city"
                        label="Πόλη"
                        name="city"
                        value={values.city}
                        autoComplete="city"
                        placeholder="Συμπληρώστε Πόλη"
                        onChange={change('city')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-country-label">Χώρα</InputLabel>
                        <Select
                            labelId="select-country-label"
                            id="select-country"
                            fullWidth
                            required
                            value={values.country}
                            onChange={change('country')}
                        >
                            <MenuItem value="">
                                <em>Επιλέξτε</em>
                            </MenuItem>
                            <MenuItem value={'GR'}>Ελλάδα</MenuItem>
                            <MenuItem value={'CY'}>Κύπρος</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        required
                        id="taxId"
                        label="ΑΦΜ"
                        name="taxId"
                        value={values.taxId}
                        placeholder="Συμπληρώστε ΑΦΜ"
                        onChange={change('taxId')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="select-tax-label">ΔΟΥ</InputLabel>
                        <Select
                            labelId="select-tax-label"
                            id="select-tax"
                            fullWidth
                            value={values.code}
                            onChange={change('code')}
                        >
                            <MenuItem value="">
                                <em>Επιλέξτε</em>
                            </MenuItem>
                            <MenuItem value={'PF'}>Παλαιού Φαλήρου</MenuItem>
                            <MenuItem value={'AG'}>Αιγαλέου</MenuItem>
                            <MenuItem value={'P1'}>Α΄ Πειραιά</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        id="activity"
                        label="Δραστηριότητα"
                        name="activity"
                        value={values.activity}
                        placeholder="Συμπληρώστε Δραστηριότητα"
                        onChange={change('activity')}
                    />
                </Grid>
            </Grid>
            <Grid container justify={entity ? 'space-between' : 'center'}>
                <Grid item xs={12} md={6} lg={4}>
                    {entity ?
                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Ενημέρωση Στοιχείων
                            </Button> :
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            className={classes.create}
                        >
                            Καταχώρηση Εγγραφής
                        </Button>
                    }
                </Grid>
                {entity ?
                    <Grid item xs={12} md={3} lg={4}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={() => alert('delete ' + entity.id + ' to be added')}
                            className={classes.error}
                        >
                            Διαγραφή Εγγραφής
                        </Button>
                    </Grid> : null
                }
            </Grid>
        </form>
    );
}