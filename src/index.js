/*
 * @Author: fei
 * @Date: 2018-02-07 15:36:10
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-09 10:08:36
 */

/**
 * third part module
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom';

/**
 * custom module: components, store;
 */
import configureStroe from './redux';
import MD from './components/markdown';
import Nav from './components/nav';

const store = configureStroe();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Nav />
        </Router>
    </Provider>,
    document.getElementById('root')
);
