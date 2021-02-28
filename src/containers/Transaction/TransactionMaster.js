import React  from 'react';
import { useSelector } from 'react-redux';

import { transactionSelector } from './transactionSlice';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/2/21.
 */

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 250,
    },
}));

export default function TransactionMaster(props) {
    const classes = useStyles();
    const { values, change, entities } = props;

    const { paymentTerms, statuses } = useSelector(transactionSelector);

    return (
        <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={6} md={4}>
                <FormControl required fullWidth className={classes.formControl}>
                    <InputLabel id="select-entity-label">Συναλλασσόμενος</InputLabel>
                    <Select
                        labelId="select-entity-label"
                        id="select-entity"
                        required
                        fullWidth
                        value={values.entityId}
                        onChange={change('entityId')}
                    >
                        <MenuItem value="">
                            <em>Επιλέξτε</em>
                        </MenuItem>
                        {entities.map(entity => (
                            <MenuItem key={entity.id} value={entity.id}>
                                {entity.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    required
                    fullWidth
                    id="title"
                    label="Τίτλος"
                    name="title"
                    placeholder="Συμπληρώστε Τίτλο"
                    autoComplete="title"
                    value={values.title}
                    onChange={change('title')}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    fullWidth
                    id="orderNumber"
                    label="Αριθμός Συναλλαγής"
                    name="orderNumber"
                    placeholder="Συμπληρώστε Αριθμό Συναλλαγής"
                    autoComplete="orderNumber"
                    value={values.orderNumber}
                    onChange={change('orderNumber')}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth className={classes.formControl}>
                    <InputLabel id="select-company-flag-label">Για Εταιρεία</InputLabel>
                    <Select
                        labelId="select-company-flag-label"
                        id="select-company-flag"
                        fullWidth
                        value={values.companyFlag}
                        onChange={change('companyFlag')}
                    >
                        <MenuItem value="">
                            <em>Επιλέξτε</em>
                        </MenuItem>
                        <MenuItem value={'0'}>Όχι</MenuItem>
                        <MenuItem value={'1'}>Ναι</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FormControl required fullWidth className={classes.formControl}>
                    <InputLabel id="select-terms-label">Τρόπος Πληρωμής</InputLabel>
                    <Select
                        labelId="select-terms-label"
                        id="select-terms"
                        required
                        fullWidth
                        value={values.paymentTerms}
                        onChange={change('paymentTerms')}
                    >
                        <MenuItem value="">
                            <em>Επιλέξτε</em>
                        </MenuItem>
                        {paymentTerms.map(term => (
                            <MenuItem key={term.code} value={term.code}>
                                {term.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FormControl required fullWidth className={classes.formControl}>
                    <InputLabel id="select-status-label">Κατάσταση</InputLabel>
                    <Select
                        labelId="select-status-label"
                        id="select-status"
                        required
                        fullWidth
                        value={values.status}
                        onChange={change('status')}
                    >
                        <MenuItem value="">
                            <em>Επιλέξτε</em>
                        </MenuItem>
                        {statuses.map(term => (
                            <MenuItem key={term.code} value={term.code}>
                                {term.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    id="notes"
                    label="Σημειώσεις Τιμολογίου"
                    name="notes"
                    placeholder="Συμπληρώστε Σημειώσεις"
                    value={values.notes}
                    onChange={change('notes')}
                />
            </Grid>
        </Grid>
    );
}