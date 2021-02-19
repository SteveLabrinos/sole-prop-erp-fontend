import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/** @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.*/

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
