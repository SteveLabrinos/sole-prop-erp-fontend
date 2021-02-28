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
import Paper from '@material-ui/core/Paper';
import Title from '../../UI/Title/Title';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/2/21.
 */

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 250,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        marginBottom: theme.spacing(2),
    }
}));

export default function TransactionCheckout(props) {
    const classes = useStyles();

    const { values, entities, items } = props;
    const { paymentTerms, statuses } = useSelector(transactionSelector);

    //  mapper for item select list
    const mapItemToDescription = id => {
        return items
            .filter(item => item.id === Number.parseInt(id))[0]
            .description;
    };

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3} justify="center" className={classes.container}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="select-entity-label">Συναλλασσόμενος</InputLabel>
                        <Select
                            labelId="select-entity-label"
                            id="select-entity"
                            required
                            readOnly
                            fullWidth
                            value={values.entityId}
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
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        id="title"
                        label="Τίτλος"
                        name="title"
                        value={values.title}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        id="orderNumber"
                        label="Αριθμός Συναλλαγής"
                        name="orderNumber"
                        value={values.orderNumber}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="select-company-flag-label">Για Εταιρεία</InputLabel>
                        <Select
                            labelId="select-company-flag-label"
                            id="select-company-flag"
                            fullWidth
                            readOnly
                            value={values.companyFlag}
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
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="select-terms-label">Τρόπος Πληρωμής</InputLabel>
                        <Select
                            labelId="select-terms-label"
                            id="select-terms"
                            fullWidth
                            readOnly
                            value={values.paymentTerms}
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
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="select-status-label">Κατάσταση</InputLabel>
                        <Select
                            labelId="select-status-label"
                            id="select-status"
                            fullWidth
                            readOnly
                            value={values.status}
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
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        rows={3}
                        id="notes"
                        label="Σημειώσεις Τιμολογίου"
                        name="notes"
                        value={values.notes}
                    />
                </Grid>
            </Grid>
            <Title>Υπηρεσίες</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Υπηρεσία</TableCell>
                        <TableCell align="right">Τιμή Μ/Μ</TableCell>
                        <TableCell align="center">Ποσότητα</TableCell>
                        <TableCell align="center">Έκπτωση</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {values.itemTransactionList
                        .map(item => (
                            <TableRow key={item.itemId}>
                                <TableCell>{mapItemToDescription(item.itemId)}</TableCell>
                                <TableCell align="right">{`${item.unitPrice}€`}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="center">{item.discount ? item.discount + '%' : '-'}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Paper>

    );
}