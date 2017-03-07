import * as React from 'react';
var Datetime = require('react-datetime');
import {Modal, Button, Form, FormGroup, Col, FormControl} from 'react-bootstrap';

export class CreateEventDialog extends React.Component {
  componentWillMount() {
    this.setState({startDate: '03/08/2017'});

  }

  show() {
    this.setState({
      showModal: true
    });
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  toggleEndDate() {
    this.setState({
      showEndDate: !this.state.showEndDate,
    });
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.close()}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: 'center'}}>Tạo sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal" style={{paddingTop: 10}}>
            <div className="form-group">
              <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                Tên sự kiện
              </div>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="eventname" placeholder="Nhập vào tên của sự kiện"/>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                Địa điểm
              </div>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="eventplace" placeholder="Nhập một địa điểm"/>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                Thời gian bắt đầu
              </div>
              <div className="col-sm-4">
                <Datetime
                  defaultValue={new Date()}
                />
              </div>
              {this.state.showEndDate ? null :
                <div className="col-sm-3">
                  <Button onClick={() => this.toggleEndDate()}>+Kết thúc</Button>
                </div>}
            </div>

            {this.state.showEndDate ? <div className="form-group">
                <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                  Thời gian kết thúc
                </div>
                <div className="col-sm-4">
                  <Datetime
                    defaultValue={new Date()}
                  />
                </div>
                <div className="col-sm-3">
                  <Button onClick={() => this.toggleEndDate()}>- Hủy bỏ</Button>
                </div>
              </div> : null}

            <div className="form-group"  style={{marginTop: 20}}>
              <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                Chủ đề
              </div>
              <div className="col-sm-7">
                <textarea className="form-control" rows="2" placeholder="Chọn chủ đề của sự kiện"></textarea>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                Mô tả
              </div>
              <div className="col-sm-7">
                <textarea className="form-control" rows="4" placeholder="Thông tin chi tiết của sự kiện"></textarea>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary">Tạo sự kiện</Button>
          <Button onClick={() => this.close()}>Hủy</Button>
        </Modal.Footer>
      </Modal>);
  }
}