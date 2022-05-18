/*
 * @Author: fei
 * @Date: 2018-02-07 15:36:10
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-18 10:41:15
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
import configureStore from './redux';
import MD from './components/markdown';
import Nav from './components/nav';

function getLocalState() {
    try {
        const serializedState = localStorage.getItem('state');
        if(!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch(err) {
        return undefined;
    }
}
function saveToLocalState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(err) {
        // ignore errors
    }
}

const store = configureStore(getLocalState());
store.subscribe(() => saveToLocalState(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Nav />
        </Router>
    </Provider>,
    document.getElementById('root')
);
