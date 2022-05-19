/*
 * @Author: fei
 * @Date: 2018-02-07 17:03:44
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-18 21:17:56
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
import localFile from './file';

const reducer = combineReducers({
    markdown,
    localFile,
});

export default function(preloadState) {
    return createStore(reducer, preloadState);
};
