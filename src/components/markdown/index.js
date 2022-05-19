/*
 * @Author: fei
 * @Date: 2018-02-07 17:15:14
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-19 10:50:01
 */

/**
 * third part module
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * custom module: components
 */
import Editor from './editor';
import Header from './header';
import Printer from './printer';
import Render from './render';
import { Col, Row, Tree } from 'antd';
import { actions } from '../../redux/file';
import { actions as markdownActions} from '../../redux/markdown';

/**
 * CSS
 */
import './assets/markdown.css';
import { ipcRenderer } from 'electron';

const FileTree = props => {
  return (
    <div
      style={{
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
      }}
    >
      <Tree treeData={props.treeData} onSelect={props.onSelect}/>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isPrinting: state.markdown.isPrinting,
    viewMode: state.markdown.viewMode,
    files: state.localFile.files,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateFiles: files => {
      dispatch(actions.updateFiles(files));
    },
    updateEditorContent: content => {
      dispatch(markdownActions.changeMarkdownContent(content))
    }
  };
};

class MD extends Component {
  componentDidMount() {
    ipcRenderer.invoke('file:list').then(files => {
      this.props.updateFiles(files);
    });
  }

  handleSelect(selectKeys) {
    ipcRenderer.invoke('file:content', `/Users/bytedance/shizuha/${selectKeys[0]}`).then(fileContent => {
      this.props.updateEditorContent(fileContent)
    });
  }

  render() {
    if (this.props.isPrinting) {
      return (
        <Row>
          <Col span={22} offset={1}>
            <Printer />
          </Col>
        </Row>
      );
    } else {
      switch (this.props.viewMode) {
        case '10':
          return (
            <div style={{ padding: '10px' }}>
              <Row>
                <Col span={24}>
                  <Header />
                </Col>
              </Row>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={4}>
                  <FileTree treeData={this.props.files.map(file => ({ title: file.name, key: file.name, path: file.path }))} />
                </Col>
                <Col span={20}>
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
                <Col span={4}>
                  <FileTree treeData={this.props.files.map(file => ({ title: file.name, key: file.name }))} onSelect={this.handleSelect.bind(this)} />
                </Col>
                <Col span={10}>
                  <Editor />
                </Col>
                <Col span={10}>
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
                <Col span={4}>
                  <FileTree treeData={this.props.files.map(file => ({ title: file.name, key: file.name }))} />
                </Col>
                <Col span={20}>
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
MD = connect(mapStateToProps, mapDispatchToProps)(MD);

export default MD;
