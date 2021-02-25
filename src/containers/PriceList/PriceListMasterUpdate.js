import { makeStyles } from '@material-ui/core';
import React  from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 24/2/21.
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
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

export default function PriceListMasterUpdate(props) {
    const classes = useStyles();
    const { values, change } = props;

    return (
        <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="description"
                    label="Περιγραφή"
                    name="description"
                    placeholder="Συμπληρώστε Περιγραφή"
                    autoComplete="description"
                    value={values.description}
                    autoFocus
                    onChange={change('description')}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl required fullWidth className={classes.formControl}>
                    <InputLabel id="select-entity-label">Τύπος</InputLabel>
                    <Select
                        labelId="select-entity-label"
                        id="select-entity"
                        required
                        fullWidth
                        value={values.entity_id}
                        onChange={change('entity_id')}
                    >
                        <MenuItem value="">
                            <em>Επιλέξτε</em>
                        </MenuItem>
                        <MenuItem value={9}>Jazzy</MenuItem>
                        <MenuItem value={60}>Trudoo</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl required fullWidth className={classes.formControl}>
                    <InputLabel id="select-status-label">Κατάσταση</InputLabel>
                    <Select
                        labelId="select-status-label"
                        id="select-status"
                        fullWidth
                        value={values.status_code}
                        onChange={change('status_code')}
                    >
                        <MenuItem value="">
                            <em>Επιλέξτε</em>
                        </MenuItem>
                        <MenuItem value={'0'}>Ενεργός</MenuItem>
                        <MenuItem value={'1'}>Ανενεργός</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="date"
                    label="Ενεργός Μέχρι"
                    type="date"
                    fullWidth
                    value={values.active_until}
                    className={classes.textField}
                    onChange={change('active_until')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
        </Grid>
    );
}