/*
 * @Author: fei
 * @Date: 2018-01-14 00:20:49
 * @Last Modified by: fei
 * @Last Modified time: 2018-01-14 22:08:30
 */

import marked from 'marked';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Button,
    Col,
    Input,
    Row
} from 'antd';

import './index.css';

const { TextArea } = Input;


class Editor extends React.Component {
    constructor() {
        super();
        const markdownContent = localStorage.getItem('markdownContent');
        this.state = {
            markdownContent: markdownContent || ''
        };
    }

    handleContentChange(event) {
        console.log(event.target.value);

        this.setState({
            markdownContent: event.target.value
        });

        if (this.props.handleMarkdownContentChange) {
            this.props.handleMarkdownContentChange(event.target.value);
        }
    }

    handleKeyDown(event) {
        switch(event.keyCode) {
            case 9: {
                event.preventDefault();
                const indent = '    '; // 4 space
                const start = event.target.selectionStart;
                const end = event.target.selectionEnd;
                const current = start + indent.length;
                let selected = window.getSelection().toString();
                selected = indent + selected.replace(/\n/g, `\n${indent}`);
                event.target.value = event.target.value.slice(0, start) +
                    selected +
                    event.target.value.slice(end);
                event.target.selectionStart = event.target.selectionEnd = current;
                this.handleContentChange(event);
                break;
            }

            default: {
                // do nothing
            }
        }
    }

    render() {
        return (
            <TextArea
                spellCheck="false"
                autosize={{ minRows: 20 }}
                style={{
                    resize: 'none',
                    fontFamily: 'monospace,cursive',
                    padding: '20px'
                }}
                value={ this.state.markdownContent }
                onKeyDown={ this.handleKeyDown.bind(this) }
                onChange={ this.handleContentChange.bind(this) } />
        );
    }
}

class Render extends React.Component {
    markdownToHTML(markdownContent) {
        return marked(markdownContent);
    }

    render() {
        return (
            <div
                style={{
                    fontFamily: 'monospace,cursive',
                    padding: '20px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px'
                }}
                dangerouslySetInnerHTML={{ __html: this.markdownToHTML(this.props.markdownContent) }}>
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        const markdownContent = localStorage.getItem('markdownContent');
        this.state = {
            markdownContent: markdownContent || '',
            isPrinting: false
        };
    }

    handleMarkdownContentChange(markdownContent) {
        localStorage.setItem('markdownContent', markdownContent)
        this.setState({
            markdownContent: markdownContent
        });
    }

    htmlToPDF() {
        this.setState({
            isPrinting: true
        }, () => {
            window.print();
            this.setState({
                isPrinting: false
            });
        });
    }

    render() {
        if (this.state.isPrinting) {
            return (
                <div>
                    <Row>
                        <Col span={18} offset={3}>
                            <div
                                dangerouslySetInnerHTML={ { __html: marked(this.state.markdownContent) } }>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div
                    style={{ padding: '10px' }}>
                    <Row>
                        <Col span={24}>
                            <Button
                                style={{ fontFamily: 'monospace,cursive' }}
                                onClick={ this.htmlToPDF.bind(this) }>
                                导出到 PDF
                            </Button>
                        </Col>
                    </Row>
                    <Row
                        style={{ marginTop: '20px' }}
                        gutter={8}>
                        <Col span={12}>
                            <Editor
                                handleMarkdownContentChange={ this.handleMarkdownContentChange.bind(this) } /> 
                        </Col>
                        <Col span={12}>
                            <Render
                                markdownContent={ this.state.markdownContent } />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
