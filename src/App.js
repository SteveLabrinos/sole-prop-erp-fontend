import { lazy, Suspense, useCallback, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authTokenSelector, authCheckState } from './containers/Auth/authSlice';
import { theme } from './shared/theme';
import Layout from './hoc/Layout/Layout';
import LoadingProgress from './UI/LoadingProgress/LoadingProgress';
import Logout from './containers/Auth/SignOut';

const Dashboard = lazy(() => import(`./containers/Dashboard/Dashboard`));
const SignIn = lazy(() => import(`./containers/Auth/SignIn`));
const SignUp = lazy(() => import(`./containers/Auth/SignUp`));


/** @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.*/

const useStyles = makeStyles(theme => ({
    mainApp: {
        fontSize: 'calc(8px + 2vmin)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
}));

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const token = useSelector(authTokenSelector);

    const onTryAutoSignUp = useCallback(() => {
        dispatch(authCheckState());
    }, [dispatch]);

    useEffect(()=> {
        onTryAutoSignUp();
    }, [onTryAutoSignUp]);

    const authRouting = token ?
        <Switch>
            <Route path="/auth/sign-out" component={Logout} />
            <Route path="/" exact render={ props => <Dashboard {...props} /> } />
            <Redirect to="/" />
        </Switch> :
        <Switch>
            <Route path="/auth/sign-in" render={props => <SignIn {...props} />} />
            <Route path="/auth/sign-up" render={props => <SignUp {...props} />} />
            <Route path="/" exact render={ props => <Dashboard {...props} /> } />
        </Switch>;

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.mainApp}>
                <Layout>
                    <Suspense fallback={ <LoadingProgress /> }>{ authRouting }</Suspense>
                </Layout>
            </div>
        </ThemeProvider>
    );
}

export default withRouter(App);
