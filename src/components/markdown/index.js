/*
 * @Author: fei
 * @Date: 2018-02-07 17:15:14
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-08 13:20:28
 */

/**
 * third part module
 */
import PropTypes from 'process';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * custom module: components
 */
import Editor from './editor';
import Header from './header';
import Printer from './printer';
import Render from './render';
import {
    Col,
    Row
} from 'antd';

/**
 * CSS
 */
import './assets/markdown.css';

const mapStateToProps = (state) => {
    return {
        isPrinting: state.markdown.isPrinting,
        viewMode: state.markdown.viewMode
    };
};
class MD extends Component {
    render() {
        if(this.props.isPrinting) {
            return (
                <Row>
                    <Col span={22} offset={1}>
                        <Printer />
                    </Col>
                </Row>
            );
        } else {
            switch(this.props.viewMode) {
                case '10':
                    return (
                        <div style={{ padding: '10px' }}>
                            <Row>
                                <Col span={24}>
                                    <Header />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ marginTop: '10px' }}>
                                <Col span={24}>
                                    <Editor />
                                </Col>
                            </Row>
                        </div>
                    );
                case '11':
                    return (
                        <div style={{ padding: '10px' }}>
                            <Row>
                                <Col span={24}>
                                    <Header />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ marginTop: '10px' }}>
                                <Col span={12}>
                                    <Editor />
                                </Col>
                                <Col span={12}>
                                    <Render />
                                </Col>
                            </Row>
                        </div>
                    );
                case '01':
                    return (
                        <div style={{ padding: '10px' }}>
                            <Row>
                                <Col span={24}>
                                    <Header />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ marginTop: '10px' }}>
                                <Col span={24}>
                                    <Render />
                                </Col>
                            </Row>
                        </div> 
                    );
                default:
                    return (
                        <div style={{ padding: '10px' }}>
                            <Row>
                                <Col span={24}>
                                    <Header />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ marginTop: '10px' }}>
                                <Col span={12}>
                                    <Editor />
                                </Col>
                                <Col span={12}>
                                    <Render />
                                </Col>
                            </Row>
                        </div>
                    );
            }
        }
    }
}
MD = connect(mapStateToProps)(MD);

export default MD;
