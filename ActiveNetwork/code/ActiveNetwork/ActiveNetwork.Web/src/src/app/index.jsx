import React, {Component} from 'react';
import {Header} from './components/header'
import {UIBlocker} from './components/ui-blocker'
// import {MessageBox} from './components/common-dialog'

export class Index extends Component {
  componentDidUpdate() {
    registerCommon();
  }

  componentDidMount() {
    registerCommon();
  }

  render() {
    return <div>
      <Header />
      <UIBlocker />
      <div id="page-wrapper">
        {this.props.children}
      </div>
    </div>;
  }
}