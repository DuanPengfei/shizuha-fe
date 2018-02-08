/*
 * @Author: fei
 * @Date: 2018-02-07 17:03:44
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-07 17:54:08
 */

/**
 * third part module
 */
import {
    createStore,
    combineReducers
} from 'redux';

/**
 * custom module: reducers
 */
import markdown from './markdown';

const reducer = combineReducers({
    markdown
});

export default function() {
    return createStore(reducer);
};
