/*
 * @Author: fei
 * @Date: 2018-01-14 00:20:49
 * @Last Modified by: fei
 * @Last Modified time: 2018-01-16 16:59:28
 */

import axios from 'axios';
import marked from 'marked';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Button,
    Col,
    Icon,
    Input,
    message,
    Row,
    Upload
} from 'antd';

import './index.css';
import Form from '_antd@3.1.3@antd/lib/form/Form';

const { TextArea } = Input;
const ButtonGroup = Button.Group;


class MDEditor extends React.Component {
    handleKeyDown(event) {
        switch (event.keyCode) {
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
                id="md-editor"
                spellCheck="false"
                autosize={{ minRows: 20 }}
                style={{
                    resize: 'none',
                    fontFamily: 'monospace,cursive',
                    padding: '20px'
                }}
                value={this.props.markdownContent}
                onKeyDown={this.handleKeyDown.bind(this)}
                onChange={this.props.handleMarkdownContentChange} />
        );
    }
}

class MDRender extends React.Component {
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

class MDHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            fileList: []
        };
    }

    uploadCustomRequest({ file, onSuccess, onError }) {
        const self = this;

        const form = new FormData();
        form.append('file', file);
        form.append('dir', '/shizuha');

        axios.post('http://node-upload.sqaproxy.souche.com/upload/aliyun', form)
            .then(function (res) {
                if (1 !== res.data.success) {
                    onError(new Error('upload picture failed'));
                    return message.error('上传图片失败');
                }

                onSuccess(undefined, file);
                self.setState({
                    fileList: []
                });
                return self.props.insertImgToMarkdownContent(res.data.path, file.name);
            })
            .catch(function (err) {
                onError(err);
                return message.error(err.message);
            });
    }

    render() {
        return (
            <div style={{ fontFamily: 'monospace,cursive' }}>
                <Row>
                    <Col span={24}>
                        <Button onClick={this.props.htmlToPDF}>
                            导出到 PDF
                        </Button>
                        <ButtonGroup style={{ marginLeft: '10px' }}>
                            <Button
                                value="10"
                                onClick={this.props.handleViewModeChange}
                            >
                                1:0
                            </Button>
                            <Button
                                value="11"
                                onClick={this.props.handleViewModeChange}
                            >
                                1:1
                            </Button>
                            <Button
                                value="01"
                                onClick={this.props.handleViewModeChange}
                            >
                                0:1
                            </Button>
                        </ButtonGroup>
                        <Upload
                            fileList={this.state.fileList}
                            customRequest={this.uploadCustomRequest.bind(this)}
                            style={{
                                marginLeft: '10px',
                                fontFamily: 'monospace, cursive'
                            }}
                        >
                            <Button>
                                上传图片
                            </Button>
                        </Upload>
                    </Col>
                </Row>
            </div>
        );
    }
}

class MD extends React.Component {
    constructor() {
        super();
        const markdownContent = localStorage.getItem('markdownContent');
        this.state = {
            markdownContent: markdownContent || '',
            isPrinting: false,
            viewMode: '11'
        };
    }

    handleMarkdownContentChange(event) {
        const markdownContent = event.target.value;

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

    handleViewModeChange(event) {
        this.setState({
            viewMode: event.target.value
        });
    }

    insertImgToMarkdownContent(url, name) {
        const mdEditorElement = document.getElementById('md-editor');
        const insertImg = ` ![${name}](${url}) `
        const start = mdEditorElement.selectionStart;
        const end = mdEditorElement.selectionEnd;
        const current = start + insertImg.length;
        const markdownContent = mdEditorElement.value.slice(0, start) +
            insertImg +
            mdEditorElement.value.slice(end);
        this.handleMarkdownContentChange({
            target: {
                value: markdownContent
            }
        });
    }

    render() {
        if (this.state.isPrinting) {
            return (
                <div>
                    <Row>
                        <Col span={18} offset={3}>
                            <div
                                dangerouslySetInnerHTML={{ __html: marked(this.state.markdownContent) }}>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        } else if ('11' === this.state.viewMode) {
            return (
                <div style={{ padding: '10px' }}>
                    <MDHeader
                        htmlToPDF={this.htmlToPDF.bind(this)}
                        handleViewModeChange={this.handleViewModeChange.bind(this)}
                        insertImgToMarkdownContent={this.insertImgToMarkdownContent.bind(this)} />
                    <Row
                        style={{ marginTop: '20px' }}
                        gutter={8}
                    >
                        <Col span={12}>
                            <MDEditor
                                markdownContent={this.state.markdownContent}
                                handleMarkdownContentChange={this.handleMarkdownContentChange.bind(this)} />
                        </Col>
                        <Col span={12}>
                            <MDRender markdownContent={this.state.markdownContent} />
                        </Col>
                    </Row>
                </div>
            );
        } else if ('01' === this.state.viewMode) {
            return (
                <div style={{ padding: '10px' }}>
                    <MDHeader
                        htmlToPDF={this.htmlToPDF.bind(this)}
                        handleViewModeChange={this.handleViewModeChange.bind(this)}
                        insertImgToMarkdownContent={this.insertImgToMarkdownContent.bind(this)} />
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={24}>
                            <MDRender markdownContent={this.state.markdownContent} />
                        </Col>
                    </Row>
                </div>
            );
        } else if ('10' === this.state.viewMode) {
            return (
                <div style={{ padding: '10px' }}>
                    <MDHeader
                        htmlToPDF={this.htmlToPDF.bind(this)}
                        handleViewModeChange={this.handleViewModeChange.bind(this)}
                        insertImgToMarkdownContent={this.insertImgToMarkdownContent.bind(this)} />
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={24}>
                            <MDEditor
                                markdownContent={this.state.markdownContent}
                                handleMarkdownContentChange={this.handleMarkdownContentChange.bind(this)} />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

ReactDOM.render(
    <MD />,
    document.getElementById('root')
);
