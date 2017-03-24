import * as React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {ANEventServiceInstance} from '../services/anevent-service';
export class JoinEventDialog extends React.Component {
  componentWillMount() {
    this.setState({
      showModal: false,
      target: {},
    });
  }
  eventId;
  show(eventId) {
    return new Promise((da) => {
      this.eventId = eventId;
      this.setState({
        showModal: true,
      });
      this.doAction = da;
    });
  };

  close() {
    this.setState({
      showModal: false
    });
  }

  toggle() {
    this.setState({showModal: !this.state.showModal})
  }

  async join() {
    let result = await ANEventServiceInstance.joinANEvents(this.eventId);
    if (result){
      this.close();
      this.doAction && this.doAction(result);
    }
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.close()}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: 'center'}}>Tham gia sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal" style={{paddingTop: 10}}>
          <div className="form-group">
            <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
              Ghi chú
            </div>
            <div className="col-sm-9">
              <textarea className="form-control" rows="5"/>
            </div>
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={()=>this.join()}>Gởi yêu cầu tham gia sự kiện</Button>
          <Button onClick={() => this.close()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}
