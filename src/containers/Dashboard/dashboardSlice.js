import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

export const dashboard = createSlice({
    name: 'dashboard',
    initialState: {
        monthlyIncome: null,
        dashboardLoading: false,
        dashboardError: null,
        incomes: []
    },
    reducers: {
        incomeStart: state => {
            state.dashboardLoading = true;
        },
        incomeFail: (state, action) => {
            state.dashboardError = action.payload;
            state.dashboardLoading = false;
        },
        incomeSuccess: (state, action) => {
            state.monthlyIncome = action.payload;
            state.dashboardLoading = false;
        },
        incomesPerMonthSuccess: (state, action) => {
            state.incomes = action.payload;
            state.dashboardLoading = false;
        },
    }
});

//  export the reducers to be used as actions
export const { incomeStart, incomeFail, incomeSuccess,
    incomesPerMonthSuccess } = dashboard.actions;


//  use dispatch to include thunk and make async actions
export const fetchMonthlyIncome = token => dispatch => {
    const getIncome = async () => {
        const response = await fetch(`${baseURL}transactions/income/last-month?tokenId=${token}`);

        response.ok ?
            dispatch(incomeSuccess(await response.json())) :
            dispatch(incomeFail(response.status));
    };

    dispatch(incomeStart());

    getIncome().catch(error => console.log(error));
};

export const fetchIncomesPerMonth = token => dispatch => {
    const getIncomesPerMonth = async () => {
        const response = await fetch(`${baseURL}transactions/income/monthly?tokenId=${token}`);

        if (response.ok) {
            dispatch(incomesPerMonthSuccess(await response.json()));
        } else {
            dispatch(incomeFail(response.status));
        }
    };

    dispatch(incomeStart());

    getIncomesPerMonth().catch(error => console.log(error));
};

//  selectors
export const dashboardSelector = state => state.dashboard;

export default dashboard.reducer;