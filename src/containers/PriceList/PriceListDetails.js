import React from 'react';
import { useSelector } from 'react-redux';

import { priceListSelector } from './priceListSlice';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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
    fab: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    priceTitle: {
        color: theme.palette.primary.dark,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(5),
        borderBottom: '1px solid #003379'
    },
    itemCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}));


export default function PriceListDetails(props) {
    const classes = useStyles();
    const { itemListValues, itemListChange, values, setValues, setItemListValues } = props;
    const { itemList } = useSelector(priceListSelector);

    const handleAddItem = event => {
        event.preventDefault();
        const updatedItemList = values.list_items;
        updatedItemList.push(itemListValues);
        setValues({ ...values, list_items:  updatedItemList });
        console.log(values);
        setItemListValues({ item_id: '', price: '', });
    };

    const mapItemToDescription = id => {
        return itemList
            .filter(item => item.item_id === Number.parseInt(id))[0]
            .description;
    };

    const handleDeleteItem = id => {
        const updatedItemList = values.list_items;
        setValues({
            ...values,
            list_items: updatedItemList
                .filter(item => item.item_id !== Number.parseInt(id))
        });
    };

    return (
        <form onSubmit={handleAddItem}>
            <Grid container alignItems="center" justify="center" spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-item-label">Υπηρεσία</InputLabel>
                        <Select
                            labelId="select-item-label"
                            id="select-item"
                            required
                            fullWidth
                            value={itemListValues.item_id}
                            onChange={itemListChange('item_id')}
                        >
                            <MenuItem value="">
                                <em>Επιλέξτε</em>
                            </MenuItem>
                            <MenuItem value={1}>Restriction of Right Ulnar Artery</MenuItem>
                            <MenuItem value={13}>Site Service</MenuItem>
                            <MenuItem value={23}>Reposition Right Radius with Ring External</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={10} sm={4}>
                    <TextField
                        required
                        fullWidth
                        id="price"
                        label="Τιμή"
                        name="price"
                        type="number"
                        placeholder="Συμπληρώστε Τιμή"
                        value={itemListValues.price}
                        onChange={itemListChange('price')}
                    />
                </Grid>
                <Grid item xs={2} >
                    <Fab color="primary"
                         type="submit"
                         className={classes.fab}
                         aria-label="add"
                         size="small">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
            <Typography variant="h4" className={classes.priceTitle} align="center">
                Υπηρεσίες Τιμοκαταλόγου
            </Typography>
            <Grid container justify="center" spacing={3}>
                {values.list_items.map((item, index) => (
                    <Grid item xs={12} sm={6} key={`${item.item_id}-${index}`}>
                        <Card>
                            <CardContent className={classes.itemCard}>
                                <Typography variant="subtitle1" component="p" color="primary">
                                    {mapItemToDescription(item.item_id)}
                                </Typography>
                                <Typography variant="subtitle1" component="p" color="secondary">
                                    {item.price}
                                </Typography>
                                <CardActions>
                                    <IconButton aria-label="delete" onClick={() => handleDeleteItem(item.item_id)}>
                                        <DeleteIcon fontSize="inherit" color="error"/>
                                    </IconButton>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </form>
    );
}