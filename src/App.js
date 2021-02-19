import { lazy, Suspense } from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, withRouter } from 'react-router-dom';

import {theme} from './shared/theme';
import Layout from './hoc/Layout/Layout';
import LoadingProgress from './UI/LoadingProgress/LoadingProgress';

const Dashboard = lazy(() => import(`./containers/Dashboard/Dashboard`));


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

    const authRouting = (
        <Switch>
            <Route path="/" exact render={ props => <Dashboard {...props} /> } />
        </Switch>
    );

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.mainApp}>
                <Layout>
                    <Suspense fallback={<LoadingProgress />}>{ authRouting }</Suspense>
                </Layout>
            </div>
        </ThemeProvider>
    );
}

export default withRouter(App);
