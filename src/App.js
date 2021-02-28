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
const EntityList = lazy(() => import(`./containers/Entity/EntityList`));
const EntityDetails = lazy(() => import(`./containers/Entity/EntityDetails`));
const EntityCreate = lazy(() => import(`./containers/Entity/EntityCreate`));
const ItemList = lazy(() => import(`./containers/Item/ItemList`));
const ItemCreate = lazy(() => import(`./containers/Item/ItemCreate`));
const PriceList = lazy(() => import(`./containers/PriceList/PriceList`));
const PriceListCreate = lazy(() => import(`./containers/PriceList/PriceListUpdate`));
const TransactionList = lazy(() => import(`./containers/Transaction/TransactionList`));
const TransactionReport = lazy(() => import(`./containers/Transaction/TransactionReport`));
const TransactionCreate = lazy(() => import(`./containers/Transaction/TransactionCreate`));
const InvoiceList = lazy(() => import(`./containers/Invoice/InvoiceList`));
const Report = lazy(() => import(`./containers/Report/Report`));


/** @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.*/

const useStyles = makeStyles(theme => ({
    mainApp: {
        fontSize: 'calc(8px + 2vmin)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
}));

//  change to request backend communication locally or from deployed vm
export const localDeployment = false;

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
            <Route path="/entities/new" render={ props => <EntityCreate token={token} {...props} /> } />
            <Route path="/entities/update/:id" render={ props => <EntityCreate token={token} {...props} /> } />
            <Route path="/entities/details/:id" render={ props => <EntityDetails token={token} {...props} /> } />
            <Route path="/entities" render={ props => <EntityList {...props} /> } />
            <Route path="/items/update/:id" render={ props => <ItemCreate token={token} {...props} /> } />
            <Route path="/items/new" render={ props => <ItemCreate token={token} {...props} /> } />
            <Route path="/items" render={ props => <ItemList token={token} {...props} /> } />
            <Route path="/price-lists/new" render={ props => <PriceListCreate token={token} {...props} /> } />
            <Route path="/price-lists" render={ props => <PriceList token={token} {...props} /> } />
            <Route path="/transactions/update/:id" render={ props => <TransactionCreate token={token} {...props} /> } />
            <Route path="/transactions/new" render={ props => <TransactionCreate token={token} {...props} /> } />
            <Route path="/transactions/:id" render={ props => <TransactionReport token={token} {...props} /> } />
            <Route path="/transactions" render={ props => <TransactionList token={token} {...props} /> } />
            <Route path="/invoices" render={ props => <InvoiceList token={token} {...props} /> } />
            <Route path="/reports" render={ props => <Report token={token} {...props} /> } />
            <Route path="/" exact render={ props => <Dashboard token={token} {...props} /> } />
            <Redirect to="/" />
        </Switch> :
        <Switch>
            <Route path="/entities" render={ props => <EntityList {...props} /> } />
            <Route path="/items" render={ props => <ItemList token={token} {...props} /> } />
            <Route path="/price-lists" render={ props => <PriceList token={token} {...props} /> } />
            <Route path="/transactions" render={ props => <TransactionList token={token} {...props} /> } />
            <Route path="/invoices" render={ props => <InvoiceList token={token} {...props} /> } />
            <Route path="/reports" render={ props => <Report token={token} {...props} /> } />
            <Route path="/auth/sign-in" render={props => <SignIn {...props} />} />
            <Route path="/auth/sign-up" render={props => <SignUp {...props} />} />
            <Redirect to="/auth/sign-in" />
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
