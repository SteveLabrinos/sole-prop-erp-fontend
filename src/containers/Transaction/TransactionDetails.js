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
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/2/21.
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
        borderBottom: '1px solid #003379',
        borderTop: '1px solid #003379'
    },
    itemCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}));


export default function TransactionDetails(props) {
    const classes = useStyles();
    const { transactionItemValues, handleTransactionItemChange, values,
        setValues, setTransactionItemValues, items } = props;

    const handleAddTransactionItem = event => {
        event.preventDefault();
        const updatedTransactionItemList = values.itemTransactionList;
        updatedTransactionItemList.push(transactionItemValues);
        setValues({ ...values, itemTransactionList:  updatedTransactionItemList });
        setTransactionItemValues({
            itemId: '',
            unitPrice: '',
            discount: '',
            quantity: '',
        });
    };

    //  mapper for item select list
    const mapItemToDescription = id => {
        return items
            .filter(item => item.id === Number.parseInt(id))[0]
            .description;
    };

    const handleDeleteTransactionItem = id => {
        const updatedTransactionItemList = values.itemTransactionList;
        setValues({
            ...values,
            itemTransactionList: updatedTransactionItemList
                .filter(item => item.itemId !== Number.parseInt(id))
        });
    };

    return (
        <form onSubmit={handleAddTransactionItem}>
            <Grid container alignItems="center" justify="center" spacing={3}>
                <Grid item xs={12} sm={8}>
                    <FormControl required fullWidth className={classes.formControl}>
                        <InputLabel id="select-item-label">Υπηρεσία</InputLabel>
                        <Select
                            labelId="select-item-label"
                            id="select-item"
                            required
                            fullWidth
                            value={transactionItemValues.itemId}
                            onChange={handleTransactionItemChange('itemId')}
                        >
                            <MenuItem value="">
                                <em>Επιλέξτε</em>
                            </MenuItem>
                            {items.map(item => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        required
                        fullWidth
                        id="unitPrice"
                        label="Τιμή / ΜΜ"
                        name="unitPrice"
                        type="number"
                        placeholder="Συμπληρώστε Τιμή"
                        value={transactionItemValues.unitPrice}
                        onChange={handleTransactionItemChange('unitPrice')}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <TextField
                        fullWidth
                        required
                        id="quantity"
                        label="Ποσότητα"
                        name="quantity"
                        type="number"
                        placeholder="Συμπληρώστε Ποσότητα"
                        value={transactionItemValues.quantity}
                        onChange={handleTransactionItemChange('quantity')}
                    />
                </Grid>
                <Grid item xs={10} sm={5}>
                    <TextField
                        fullWidth
                        id="discount"
                        label="Ποσοστό Έκπτωσης"
                        name="unitPrice"
                        type="number"
                        placeholder="Συμπληρώστε Ποσοστό"
                        value={transactionItemValues.discount}
                        onChange={handleTransactionItemChange('discount')}
                    />
                </Grid>
                <Grid item xs={2} sm={1} >
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
                Υπηρεσίες Συναλλαγής
            </Typography>
            <Grid container justify="center" spacing={3}>
                {values.itemTransactionList.map(item => (
                    <Grid item xs={12} sm={6} key={item.itemId}>
                        <Card>
                            <CardContent className={classes.itemCard}>
                                <Typography variant="subtitle1" component="p" color="primary">
                                    {mapItemToDescription(item.itemId)}
                                </Typography>
                                <Typography variant="subtitle1" component="p" color="secondary">
                                    {`${item.unitPrice}€`}
                                </Typography>
                                <Typography variant="subtitle1" component="p" color="secondary">
                                    {item.quantity}
                                </Typography>
                                <Typography variant="subtitle1" component="p" color="secondary">
                                    {item.discount ? item.discount + '%' : '-'}
                                </Typography>
                                <CardActions>
                                    <IconButton aria-label="delete"
                                                onClick={() => handleDeleteTransactionItem(item.itemId)}>
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