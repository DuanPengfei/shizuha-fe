/*
 * @Author: fei
 * @Date: 2018-02-07 17:20:08
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-18 21:23:33
 */

/**
 * third part module
 */
import React from 'react';
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

    handleKeyDown(event) {
        switch (true) {
            case 9 === event.keyCode: {
                event.preventDefault();

                const indent = '    '; // 4 space
                const start = event.target.selectionStart;
                const end = event.target.selectionEnd;
                const current = start + indent.length;

                let selected = window.getSelection().toString();
                selected = indent + selected.replace(/\n/g, `\n${indent}`);
                const newValue = event.target.value.slice(0, start) +
                    selected +
                    event.target.value.slice(end);
                event.target.value = newValue

                event.target.selectionStart = event.target.selectionEnd = current;
                this.props.onMarkdownContentChange(newValue);
                break;
            }

            // `}`: 221
            case event.ctrlKey && 221 === event.keyCode: {
                event.preventDefault();

                const indent = '    '; // 4 space
                const start = event.target.selectionStart;
                const end = event.target.selectionEnd;
                const current = start + indent.length;

                let selected = window.getSelection().toString();
                selected = indent + selected.replace(/\n/g, `\n${indent}`);
                const newValue = event.target.value.slice(0, start) +
                    selected +
                    event.target.value.slice(end);
                event.target.value = newValue

                event.target.selectionStart = event.target.selectionEnd = current;
                this.props.onMarkdownContentChange(newValue);
                break;
            }

            // `{`: 219
            case event.ctrlKey && 219 === event.keyCode: {
                event.preventDefault();

                const start = event.target.selectionStart;
                const end = event.target.selectionEnd;

                let selected = window.getSelection().toString();
                selected = selected.replace('    ', '');
                selected = selected.replace(/\n\s{4}/g, '\n');
                const newValue = event.target.value.slice(0, start) +
                    selected +
                    event.target.value.slice(end);
                event.target.value = newValue

                event.target.selectionStart = event.target.selectionEnd = start;
                this.props.onMarkdownContentChange(newValue);
                break; 
            }
        }
    }

    render() {
        return (
            <TextArea
                id="shizuha-md-editor"
                spellCheck="false"
                autoSize={{ minRows: 20 }}
                style={{
                    ...this.props.style,
                    resize: 'none',
                    padding: '20px'
                }}
                value={this.props.markdownContent}
                onChange={this.handleMarkdownContentChange.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)} />
        );
    }
}
Editor = connect(mapStateToProps, mapDispatchToProps)(Editor);

export default Editor;