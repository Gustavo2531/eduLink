import '../public/favicon.ico';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import RootComponent from './app/components/RootComponent';

import configureStore from './app/store/configureStore';
var appStore = configureStore();
// var appStore = configureStore({ counterReducer: 100 });

ReactDOM.render(
    <Provider store={appStore}>
        <BrowserRouter>
            <RootComponent />
        </BrowserRouter>
    </Provider>, document.getElementById("container"));
