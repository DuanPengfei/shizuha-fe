/*
 * @Author: fei
 * @Date: 2018-02-07 15:36:10
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-07 18:10:22
 */

/**
 * third part module
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/**
 * custom module: components, store;
 */
import MD from './components/markdown';
import configureStroe from './redux';

const store = configureStroe();

ReactDOM.render(
    <Provider store={store}>
        <MD />
    </Provider>,
    document.getElementById('root')
);
