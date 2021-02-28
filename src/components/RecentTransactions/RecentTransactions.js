import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../UI/Title/Title';
import { fetchTransactions, transactionSelector } from '../../containers/Transaction/transactionSlice';
import { fetchEntitiesCollection, entitiesSelector } from '../../containers/Entity/entitySlice';
import LoadingProgress from "../../UI/LoadingProgress/LoadingProgress";

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 28/2/2021.
 */

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function RecentTransactions({ token }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { transactions, paymentTerms } = useSelector(transactionSelector);
    const { entities } = useSelector(entitiesSelector);

    //  async dispatch to fetch transactions
    const onFetchTransactions = useCallback(() => {
        dispatch(fetchTransactions(token));
    }, [dispatch, token]);
    //  async dispatch to fetch entities
    const onFetchEntities = useCallback(() => {
        dispatch(fetchEntitiesCollection(token));
    }, [dispatch, token]);

    //  fetching the initial transactions from the DB
    useEffect(() => {
        //  populating transactions if the list is empty in the store
        if (transactions.length === 0) {
            onFetchTransactions();
        }
        //  populating entities to get the list if the isn't in the store
        if (entities.length === 0) {
            onFetchEntities();
        }
    }, [entities.length, onFetchEntities, transactions.length, onFetchTransactions]);

    return transactions.length === 0 || entities.length === 0 ?
        <LoadingProgress /> :
        <React.Fragment>
            <Title>Πρόσφατες Συναλλαγές</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Ημερομηνία</TableCell>
                        <TableCell>Περιγραφή</TableCell>
                        <TableCell>Συναλλασόμενος</TableCell>
                        <TableCell>Τρόπος Πληρωμής</TableCell>
                        <TableCell align="right">Συνολικό Ποσό</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.slice(0, 5).map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.createdDate}</TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{entities.filter(e => e.id === row.entityId)[0].name}</TableCell>
                            <TableCell>{paymentTerms.filter(t => t.code === row.paymentTerms)[0].value}</TableCell>
                            <TableCell align="right">{`${Number(row.totalPrice).toFixed(2)} €`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Περισσότερα
                </Link>
            </div>
        </React.Fragment>
}