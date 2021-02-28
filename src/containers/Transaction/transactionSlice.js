import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

const transaction = createSlice({
    name: 'transaction',
    initialState: {
        processed: false,
        transactionLoading: false,
        error: null,
        transactions: [],
        paymentTerms: [
            {code: '1', value: 'Επί Πιστώσει'},
            {code: '2', value: 'Μετρητοίς'},
            {code: '3', value: 'Δόσεις'},
        ],
        statuses: [
            {code: '1', value: 'Εκκρεμότητα Πληρωμής'},
            {code: '2', value: 'Ολοκληρωμένη'},
            {code: '3', value: 'Ακυρωμένη'},
        ]
    },
    reducers: {
        transactionStart: state => {
            state.transactionLoading = true;
        },
        transactionFail: (state, action) => {
            state.error = action.payload;
            state.transactionLoading = false;
        },
        fetchTransactionSuccess: (state, action) => {
            state.transactions = action.payload;
            state.transactionLoading = false;
        },
        clearError: state => {
            state.error = null;
        }
    }
});

export const { transactionStart, transactionFail, fetchTransactionSuccess,
    clearError } = transaction.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchTransactions = token => dispatch => {
    const getTransactions = async () => {
        const response = await fetch(`${baseURL}transactions?tokenId=${token}`);

        if (response.ok) {
            const data = await response.json();
            const setData = data.map(transaction => {
                const createdDate = new Date(transaction.createdDate)
                    .toISOString()
                    .replace(/T.*/, '')
                    .split('-')
                    .reverse()
                    .join('-');
                return {...transaction, createdDate};
            });
            dispatch(fetchTransactionSuccess(setData));
        } else {
            dispatch(transactionFail(response.status));
        }
    };
    dispatch(transactionStart());

    getTransactions().catch(error => console.log(error));
};


//  selectors
export const transactionSelector = state => state.transaction;


export default transaction.reducer;