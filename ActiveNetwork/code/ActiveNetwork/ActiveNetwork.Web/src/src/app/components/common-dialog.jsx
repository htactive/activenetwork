import * as React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {MessageBoxButton, MessageBoxResult, MessageBoxType, MessageBoxButtons} from '../../commons/constant'

export class MessageBox extends React.Component{

  state = {type: MessageBoxType.Confirmation, buttons: MessageBoxButtons.OKCancel};
  doAction;
  static instance;

  componentWillMount() {
    MessageBox.instance = this;
  }

  show(st) {
    return new Promise (function(res, rej) {
        st.isShow = true;
        this.setState(st);
        this.doAction = res;
      });
  }

  action(result) {
    this.close();
    this.doAction && this.doAction(result);
  }

  render() {
    return (
      <Modal show={this.state.isShow} onHide={() => this.action(MessageBoxResult.None)}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="center" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
        </Modal.Body>
        <Modal.Footer>
          {((MessageBoxButton.OK & this.state.buttons) != 0) && (
            <Button onClick={() => this.action(MessageBoxResult.OK)}>Đồng ý</Button>)}
          {((MessageBoxButton.Cancel & this.state.buttons) != 0) && (
            <Button onClick={() => this.action(MessageBoxResult.Cancel)}>Hủy bỏ</Button>)}
          {((MessageBoxButton.Yes & this.state.buttons) != 0) && (
            <Button onClick={() => this.action(MessageBoxResult.Yes)}>Có</Button>)}
          {((MessageBoxButton.No & this.state.buttons) != 0) && (
            <Button onClick={() => this.action(MessageBoxResult.No)}>Không</Button>)}
        </Modal.Footer>
      </Modal>
    )
  }

  private close() {
    this.setState({isShow: false});
  }
}