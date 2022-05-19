/*
 * @Author: fei
 * @Date: 2018-02-07 15:36:10
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-19 10:57:04
 */

/**
 * third part module
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

import './assets/nav.css';
import logo from './assets/logo.png';

/**
 * custom module: components
 */
import MD from '../markdown';

const mapStateToProps = state => {
  return {
    isPrinting: state.markdown.isPrinting,
  };
};
class Nav extends Component {
  render() {
    if (this.props.isPrinting) {
      return (
        <div>
          <div>
            <Routes>
              <Route exact path="/markdown" element={<MD />} />
              <Route path="/" element={<MD />} />
            </Routes>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="nav">
            <div className="logo">
              <img src={logo} />
            </div>
            <ul>
              <li>
                <Link to="/markdown">Markdown</Link>
              </li>
            </ul>
          </div>
          <div>
            <Routes>
              <Route exact path="/markdown" element={<MD />} />
              <Route path="/" element={<MD />} />
            </Routes>
          </div>
        </div>
      );
    }
  }
}
Nav = connect(mapStateToProps)(Nav);

export default Nav;
