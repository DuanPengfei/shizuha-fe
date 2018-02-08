/*
 * @Author: fei
 * @Date: 2018-02-07 17:20:08
 * @Last Modified by: fei
 * @Last Modified time: 2018-02-08 09:26:14
 */

/**
 * third part module
 */
import markdownIt from 'markdown-it';
import PropTypes from 'process';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        markdownContent: state.markdown.markdownContent,
        style: state.markdown.style
    };
};
class Render extends React.Component {
    constructor() {
        super();
        this.md = markdownIt({
            html: true,
            xhtmlOut: true,
            linkify: true
        });
    }

    _markdownToHTML(markdownContent) {
        return this.md.render(markdownContent);
    }

    render() {
        return (
            <div
                style={{
                    ...this.props.style,
                    padding: '20px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px'
                }}
                dangerouslySetInnerHTML={{ __html: this._markdownToHTML(this.props.markdownContent) }}>
            </div>
        );
    }
}
Render = connect(mapStateToProps)(Render);

export default Render;