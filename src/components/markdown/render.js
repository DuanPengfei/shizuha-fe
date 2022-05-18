/*
 * @Author: fei
 * @Date: 2018-02-07 17:20:08
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-18 10:29:59
 */

/**
 * third part module
 */
import markdownIt from 'markdown-it';
const markdownItTaskList = require('markdown-it-task-lists')
import React from 'react';
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
        }).use(markdownItTaskList);
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