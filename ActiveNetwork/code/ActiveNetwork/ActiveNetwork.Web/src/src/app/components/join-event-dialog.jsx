import * as React from 'react';

export class JoinEventDialog extends React.Component {
  componentWillMount(){
    this.setState({
      showModal: false,
      target: {},
    });
  }

  show() {
    this.setState({
      showModal: true,
    });
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  toggle () {
    this.setState({ showModal: !this.state.showModal })
  }

  render(){
    debugger;
    return (
      <div></div>
    );
  };
}
