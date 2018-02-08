/*
 * @Author: fei
 * @Date: 2018-02-07 17:20:08
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-08 09:51:54
 */

/**
 * third part module
 */
import PropTypes from 'process';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

import { actions } from '../../redux/markdown';

const { TextArea } = Input;

const mapStateToProps = (state) => {
    return {
        markdownContent: state.markdown.markdownContent,
        style: state.markdown.style,
        changeMarkdownContent: state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onMarkdownContentChange: (markdownContent) => {
            dispatch(actions.changeMarkdownContent(markdownContent));
        }
    };
};
class Editor extends React.Component {
    handleMarkdownContentChange(event) {
        return this.props.onMarkdownContentChange(event.target.value);
    }

    render() {
        return (
            <TextArea
                id="shizuha-md-editor"
                spellCheck="false"
                autosize={{ minRows: 20 }}
                style={{
                    ...this.props.style,
                    resize: 'none',
                    padding: '20px'
                }}
                value={this.props.markdownContent}
                onChange={this.handleMarkdownContentChange.bind(this)} />
        );
    }
}
Editor = connect(mapStateToProps, mapDispatchToProps)(Editor);

export default Editor;