/*
 * @Author: fei
 * @Date: 2018-02-07 15:36:10
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-19 10:54:22
 */

/**
 * third part module
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

/**
 * custom module: components, store;
 */
import configureStore from './redux';
import Nav from './components/nav';

function getLocalState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}
function saveToLocalState(state) {
  try {
    const serializedState = JSON.stringify({ ...state, localFiles: [] });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // ignore errors
  }
}

const store = configureStore(getLocalState());
store.subscribe(() => saveToLocalState(store.getState()));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Nav />
    </HashRouter>
  </Provider>
);
