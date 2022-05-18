/*
 * @Author: fei
 * @Date: 2018-02-07 17:20:08
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-18 10:39:02
 */

/**
 * third part module
 */
import markdownIt from 'markdown-it';
const markdownItTaskList = require('markdown-it-task-lists')
import PropTypes from 'process';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions } from '../../redux/markdown';

const mapStateToProps = (state) => {
    return {
        markdownContent: state.markdown.markdownContent,
        style: state.markdown.style
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onIsPrintingChange: (isPrinting) => {
            dispatch(actions.changeIsPrinting(isPrinting));
        }
    };
}
class Printer extends React.Component {
    constructor() {
        super();
        this.md = markdownIt({
            html: true,
            xhtmlOut: true,
            linkify: true
        }).use(markdownItTaskList);
    }

    componentDidMount() {
        window.print();
        return this.props.onIsPrintingChange(false);
    }

    _markdownToHTML(markdownContent) {
        return this.md.render(markdownContent);
    }

    render() {
        return (
            <div
                style={{
                    ...this.props.style
                }}
                dangerouslySetInnerHTML={{ __html: this._markdownToHTML(this.props.markdownContent) }}>
            </div>
        );
    }
}
Printer = connect(mapStateToProps, mapDispatchToProps)(Printer);

export default Printer;