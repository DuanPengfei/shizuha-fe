/*
 * @Author: fei
 * @Date: 2018-02-07 17:20:08
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-08 17:35:43
 */

/**
 * third part module
 */
import axios from 'axios';
import PropTypes from 'process';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Col,
    Input,
    message,
    Row,
    Upload
} from 'antd';

import { actions } from '../../redux/markdown';

const ButtonGroup = Button.Group;

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
        },
        onViewModeChange: (viewMode) => {
            dispatch(actions.changeViewMode(viewMode));
        },
        onMarkdownContentChange: (markdownContent) => {
            dispatch(actions.changeMarkdownContent(markdownContent));
        }
    };
}
class Header extends Component {
    _insertImgToMarkdownContent(url, name) {
        const editorElement = document.getElementById('shizuha-md-editor');
        const insertImg = ` ![${name}](${url}) `
        const start = editorElement.selectionStart;
        const end = editorElement.selectionEnd;
        const current = start + insertImg.length;
        const markdownContent = editorElement.value.slice(0, start) +
            insertImg +
            editorElement.value.slice(end);
        return markdownContent;
    }

    handleUpload({ file, onSuccess, onError }) {
        const data = new FormData();
        data.append('file', file);
        data.append('dir', '/shizuha');

        axios.post('http://node-upload.sqaproxy.souche.com/upload/aliyun', data)
            .then((res) => {
                if (1 !== res.data.success) {
                    onError(new Error('upload picture failed'));
                    return message.error('上传图片失败');
                }

                onSuccess(undefined, file);
                this.props.onMarkdownContentChange(this._insertImgToMarkdownContent(res.data.path, file.name));
                message.success('图片地址已插入编辑框');
            })
            .catch(function (err) {
                onError(err);
                return message.error(err.message);
            });
    }

    handleFontFamilyChange(event) {
        if (!event.target.value) return this.props.onFontFamilyChange('monospace, cursive');
        return this.props.onFontFamilyChange(event.target.value);
    }

    handleIsPrintingChange() {
        return this.props.onIsPrintingChange(true);
    }

    handleViewModeChange(event) {
        return this.props.onViewModeChange(event.target.value)
    }

    render() {
        return (
            <div style={{ ...this.props.style }}>
                <Row gutter={8}>
                    <Col span={12}>
                        <ButtonGroup>
                            <Button
                                value="10"
                                onClick={this.handleViewModeChange.bind(this)}
                            >
                                1:0
                            </Button>
                            <Button
                                value="11"
                                onClick={this.handleViewModeChange.bind(this)}
                            >
                                1:1
                            </Button>
                            <Button
                                value="01"
                                onClick={this.handleViewModeChange.bind(this)}
                            >
                                0:1
                            </Button>
                        </ButtonGroup>
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={this.handleIsPrintingChange.bind(this)}>
                            导出到 PDF
                        </Button>
                        <Upload
                            customRequest={this.handleUpload.bind(this)}
                            style={{
                                ...this.props.style,
                                marginLeft: '10px'
                            }}
                        >
                            <Button>
                                上传图片
                            </Button>
                        </Upload>
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
