/*
 * @Author: fei
 * @Date: 2018-02-07 17:20:08
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-08 10:43:15
 */

/**
 * third part module
 */
import PropTypes from 'process';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Col,
    Input,
    Row
} from 'antd';

import { actions } from '../../redux/markdown';

const mapStateToProps = (state) => {
    return {
        style: state.markdown.style
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onFontFamilyChange: (fontFamily) => {
            dispatch(actions.changeFontFamily(fontFamily));
        },
        onIsPrintingChange: (isPrinting) => {
            dispatch(actions.changeIsPrinting(isPrinting));
        }
    };
}
class Header extends Component {
    handleFontFamilyChange(event) {
        if(!event.target.value) return this.props.onFontFamilyChange('monospace, cursive');
        return this.props.onFontFamilyChange(event.target.value);
    }

    handleIsPrintingChange() {
        this.props.onIsPrintingChange(true);
    }

    render() {
        return (
            <div style={{ ...this.props.style }}>
                <Row gutter={8}>
                    <Col span={12}>
                        <Button onClick={this.handleIsPrintingChange.bind(this)}>
                            导出到 PDF
                        </Button> 
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="CSS 自定义字体"
                            onPressEnter={this.handleFontFamilyChange.bind(this)} />
                    </Col> 
                </Row>
            </div>
        );
    }
};
Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;
