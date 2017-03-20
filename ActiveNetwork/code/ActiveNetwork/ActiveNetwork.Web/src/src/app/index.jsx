import React, {Component} from 'react';
import {Header} from './components/header';
import {UIBlocker} from './components/ui-blocker';
import {} from '../commons/message-box';
import {MessageBox} from '../commons/message-box';

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
      <MessageBox/>
      <UIBlocker />
      <div id="page-wrapper">
        {this.props.children}
      </div>
    </div>;
  }
}