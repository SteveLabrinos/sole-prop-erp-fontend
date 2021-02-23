import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { authSignOut, authTokenSelector } from './authSlice';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 19/2/2021.
 */

export default function Logout() {
    const dispatch = useDispatch();

    const token = useSelector(authTokenSelector);

    //  async action dispatching in order to post logout to the backend
    const onUserLogout = useCallback(() => {
        dispatch(authSignOut(token));
    }, [dispatch, token]);

    useEffect(() => {
        onUserLogout();
    });

    return <Redirect to="/auth/sign-in" />;
}