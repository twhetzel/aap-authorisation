import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Router } from 'react-router-dom';

import { UserProvider } from './user-context';
import { AuthProvider } from './auth-context';

import history from "./history";

ReactDOM.render(
    <AuthProvider>
        <UserProvider>
            <Router history={history}>
                {/* <Security {...oktaConfig}> */}
                < App />
                {/* </Security> */}
            </Router>
        </UserProvider>
    </AuthProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
