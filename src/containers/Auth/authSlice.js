import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        error: null,
        loading: false,
    },
    reducers: {
        authStart: state => {
            state.error = null;
            state.loading = true;
        },
        authSuccess: (state, action) => {
            state.token = action.payload;
            state.error = null;
            state.loading = true;
        },
        authFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        authLogout: state => {
            state.token = null;
        },
        authLogoutError: (state, action) => {
            state.error = action.payload
        }
    }
});


//  export the reducers to be used as actions
export const { authStart, authSuccess, authFail, authLogout, authLogoutError } = authSlice.actions;

//  use dispatch to include thunk and make async actions
export const authSignOut = token => async dispatch => {
    const response = await fetch(`ms/ais/api/user/signout?tokenId=${token}`);
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        dispatch(authLogoutError(message));
    }
    await response.json();
    localStorage.removeItem('erp-token');
    return dispatch(authLogout());
    //  deleting token from the backend
    // axios.delete(`ms/ais/api/user/signout?tokenId=${token}`)
    //     .then(response => {
    //         //  remove local storage user information
    //         localStorage.removeItem('erp-token');
    //         dispatch(authLogout());
    //     })
    //     .catch(error => authLogoutError(error.data ? error.data : true));
};

export const authSignIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        axios.get(`ms/ais/api/user/signin?email=${email}&password=${password}`)
            .then(response => {
                //  store token into the local storage
                localStorage.setItem('erp-token', response.data);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                dispatch(authFail(error.data ? error.data : true));
            });
    }
}

export const authSignUp = (firstName, lastName, email, password) => {
    return dispatch => {
        dispatch(authStart());
        //  user authentication
        const authData = {
            firstName,
            lastName,
            email,
            password
        };

        //  SignUp
        axios.post(`ms/ais/api/user/signup`, authData)
            .then(response => {
                // store token into the local storage
                localStorage.setItem('erp-token', response.data);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                dispatch(authFail(error.data ? error.data : true));
            });
    }
};

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('erp-token');

    if (token) {
        dispatch(authSuccess(token));
    }
};

//  selectors
export const authSelector = state => state.auth;
export const authTokenSelector = state => state.auth.token;

//  default export dashboardSlice.reducer;
export default authSlice.reducer;