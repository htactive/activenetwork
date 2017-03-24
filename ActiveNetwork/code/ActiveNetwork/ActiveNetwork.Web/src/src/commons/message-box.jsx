import * as React from 'react'
import {Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';

const MessageBoxButton = {
  Yes: 1,
  No: 2,
  Cancel: 4,
  OK: 8,
};

export const MessageBoxResult =
  {
    Yes: 1,
    No: 2,
    Cancel: 4,
    OK: 8,
    None: 0
  };

export const MessageBoxType =
  {
    Information: 1,
    Confirmation: 2,
    Warning: 3,
    Error: 4
  };

export const MessageBoxButtons =
  {
    YesNo: 3,
    YesNoCancel: 7,
    OK: 8,
    OKCancel: 10
  };


export class MessageBox extends React.Component {

  static instance;

  componentWillMount() {
    MessageBox.instance = this;
    this.setState({type: MessageBoxType.Confirmation, buttons: MessageBoxButtons.OKCancel});
  }

  show(st) {
    return new Promise((da) => {
        st.isShow = true;
        this.setState(st);
        this.doAction = da;
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

  close() {
    this.setState({isShow: false});
  }
}