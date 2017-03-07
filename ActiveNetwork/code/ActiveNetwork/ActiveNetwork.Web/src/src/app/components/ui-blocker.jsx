import * as React from 'react';


export class UIBlocker extends React.Component{
  static instance;

  componentWillMount() {
    UIBlocker.instance = this;
    this.setState({currentThread: 0});
  }

  currentThread;

  block() {
    this.setState({
      currentThread: this.state.currentThread + 1
    });
  };

  unblock() {
    this.setState({
      currentThread: this.state.currentThread ? this.state.currentThread - 1 : 0
    });
  };

  render() {
    if (this.state.currentThread) {
      return (
        <div className="ui-blocked">
          <div className="loading-icon">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
          </div>
        </div>
      );
    }
    return null;
  }
}