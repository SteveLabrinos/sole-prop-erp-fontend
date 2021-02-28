import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

const invoice = createSlice({
    name: 'invoice',
    initialState: {
        invoiceLoading: false,
        invoiceError: null,
        invoices: [],
        statuses: [
            {code: '1', value: 'Εκκρεμότητα Πληρωμής'},
            {code: '2', value: 'Ολοκληρωμένη'},
            {code: '3', value: 'Ακυρωμένη'},
        ]
    },
    reducers: {
        invoiceStart: state => {
            state.invoiceLoading = true;
        },
        invoiceFail: (state, action) => {
            state.invoiceError = action.payload;
            state.invoiceLoading = false;
        },
        fetchInvoiceSuccess: (state, action) => {
            state.invoices = action.payload;
            state.invoiceLoading = false;
        },
        clearError: state => {
            state.invoiceError = null;
        }
    }
});

export const { invoiceStart, invoiceFail, fetchInvoiceSuccess,
    clearError } = invoice.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchInvoices = token => dispatch => {
    const getInvoices = async () => {
        const response = await fetch(`${baseURL}invoices?tokenId=${token}`);

        if (response.ok) {
            const data = await response.json();

            dispatch(fetchInvoiceSuccess(data));
        } else {
            dispatch(invoiceFail(response.status));
        }
    };
    dispatch(invoiceStart());

    getInvoices().catch(error => console.log(error));
};


//  selectors
export const invoiceSelector = state => state.invoice;


export default invoice.reducer;