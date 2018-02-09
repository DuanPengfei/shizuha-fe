/*
 * @Author: fei
 * @Date: 2018-02-07 15:36:10
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-09 14:03:14
 */

/**
 * third part module
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Link,
    Route,
    withRouter
} from 'react-router-dom';

import './assets/nav.css';
import logo from './assets/logo.png';

/**
 * custom module: components
 */
import MD from '../markdown';

class ToDo extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>todo: 1</li>
                    <li>todo: 2</li>
                    <li>todo: 3</li>
                    <li>todo: 4</li>
                    <li>todo: 5</li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        isPrinting: state.markdown.isPrinting
    });
}
class Nav extends Component {
    render() {
        console.log(this.props.isPrinting);
        if(this.props.isPrinting) {
            return (
                <div>
                    <div>
                        <Route exact path="/" component={ToDo} />
                        <Route exact path="/todo" component={ToDo} />
                        <Route exact path="/markdown" component={MD} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="nav">
                        <div className="logo"><img src={logo} /></div>
                        <ul>
                            <li><Link to="/todo">ToDo</Link></li>
                            <li><Link to="/markdown">Markdown</Link></li>
                        </ul>
                    </div>
                    <div>
                        <Route exact path="/" component={ToDo} />
                        <Route exact path="/todo" component={ToDo} />
                        <Route exact path="/markdown" component={MD} />
                    </div>
                </div>
            );
        }
    }
}
Nav = withRouter(connect(mapStateToProps)(Nav));

export default Nav;
