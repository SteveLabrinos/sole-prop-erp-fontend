import { createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../shared/utility';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userId: null,
        error: null,
        loading: false,
    },
    reducers: {
        authStart: state => {
            state.error = null;
            state.loading = true;
        },
        authSuccess: (state, action) => {
            state.token = action.payload.tokenId;
            state.userId = action.payload.user.id;
            state.firstName = action.payload.user.firstName;
            state.lastName = action.payload.user.lastName;
            state.error = null;
            state.loading = false;
        },
        authFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        authLogout: state => {
            state.token = null;
            state.userId = null;
            state.firstName = null;
            state.lastName = null;
        },
        authLogoutError: (state, action) => {
            state.error = action.payload
        }
    }
});

//  export the reducers to be used as actions
export const { authStart, authSuccess, authFail, authLogout, authLogoutError } = authSlice.actions;

const successLogin = async (response, dispatch) => {
    if (!response.ok) {
        dispatch(authFail(response.status));
        throw new Error('Error processing data: ' + response.status);
    } else {
        const data = await response.json();
        //  store user data into the local storage
        localStorage.setItem('erp-token', data.tokenId);
        localStorage.setItem('erp-id', data.user.id);
        localStorage.setItem('erp-firstname', data.user.firstName);
        localStorage.setItem('erp-lastname', data.user.lastName);
        dispatch(authSuccess(data));
    }
}

//  use dispatch to include thunk and make async actions
export const authSignOut = token => async dispatch => {
    const response = await fetch(`${baseURL}user/signout?tokenId=${token}`,
        { method: 'DELETE' });
    if (!response.ok) {
        authLogoutError(response.status );
        throw new Error('Error deleting session token: ' + response.status);
    } else {
        //  remove local storage user information
        localStorage.removeItem('erp-token');
        localStorage.removeItem('erp-id');
        localStorage.removeItem('erp-firstname');
        localStorage.removeItem('erp-firstname');
        dispatch(authLogout());
    }
};



export const authSignIn = (username, password) => async dispatch => {
    dispatch(authStart());
    const response = await
        fetch(`${baseURL}user/signin?username=${username}&password=${password}`);

    await successLogin(response, dispatch);
};

export const authSignUp = (firstname, lastname, username, email, password) => async dispatch => {
    dispatch(authStart());
    //  user authentication
    const authData = {
        firstname,
        lastname,
        username,
        email,
        password
    };
    //  Sign Up
    const response = await fetch(`${baseURL}user/signup`, {
        method: 'POST',
        body: JSON.stringify(authData)
    });

    await successLogin(response, dispatch);
};

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('erp-token');
    const id = localStorage.getItem('erp-id');
    const firstName = localStorage.getItem('erp-firstname');
    const lastName = localStorage.getItem('erp-lastname');

    if (token) {
        const payload = {
            tokenId: token,
            user: { id, firstName, lastName }
        }
        dispatch(authSuccess(payload));
    }
};

//  selectors
export const authSelector = state => state.auth;
export const authTokenSelector = state => state.auth.token;

//  default export dashboardSlice.reducer;
export default authSlice.reducer;