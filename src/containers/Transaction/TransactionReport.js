import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';

import { baseURL } from '../../shared/utility';
import LoadingProgress from '../../UI/LoadingProgress/LoadingProgress';
import Cockpit from '../../UI/Cockpit/Cockpit';
import Transaction from '../../components/Transaction/Transaction';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 27/2/21.
 */

export default function TransactionReport({ token }) {
    const params = useParams();


    const [transaction, setTransaction] = useState({
        transactionData: null,
        loading: true
    });

    //  getting the transaction from the DB
    const onFetchTransaction = useCallback(async () => {
        setTransaction({ transactionData: null, loading: true });

        const response = await fetch(`${baseURL}transaction/id/${params.id}?tokenId=${token}`);

        if (response.ok) {
            const data = await response.json();
            setTransaction({
                transactionData: data,
                loading: false
            });
        } else {
            throw Error('Problem accessing transaction');
        }

    }, [token, params.id]);

    //  get Transaction on initialization
    useEffect(() => {
        if(!transaction.transactionData && token) {
            onFetchTransaction().catch(error => console.log(error));
        }
    }, [onFetchTransaction, token, transaction.transactionData]);

    //  displaying data
    const authRedirect = !token ? <Redirect to="auth/sign-in"/> : null;

    const displayTransaction = transaction.loading ?
        <LoadingProgress /> :
        <Transaction
            token={token}
            transaction={transaction.transactionData} />

    return (
        <React.Fragment>
            <Cockpit title="Ανάλυση Συναλλαγής" />
            {authRedirect}
            {displayTransaction}
        </React.Fragment>
    );
}