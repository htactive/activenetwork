import * as React from 'react';
var Datetime = require('react-datetime');
import {Modal, Button, Form, FormGroup, Col, FormControl} from 'react-bootstrap';

export class CreateEventDialog extends React.Component {
  componentWillMount() {
    this.setState({startDate:'03/08/2017'});

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

  toggleEndDate(){
    this.setState({
      showEndDate: !this.state.showEndDate,
    });
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={() => this.close()}>
        <Modal.Header closeButton >
          <Modal.Title style={{textAlign: 'center'}}>Tạo sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup>
              <Col sm={3} style={{textAlign: 'right'}} >
                Tên sự kiện
              </Col>
              <Col sm={7}>
                <FormControl type="text" placeholder="Nhập vào tên của sự kiện"></FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={3} style={{textAlign: 'right'}}>
                Địa điểm
              </Col>
              <Col sm={7}>
                <FormControl type="text" placeholder="Nhập một địa điểm"></FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={3} style={{textAlign: 'right'}}>
                Thời gian bắt đầu
              </Col>
              <Col sm={4}>
                <Datetime
                  defaultValue={new Date()}
                />
              </Col>
              {this.state.showEndDate? null:
              <Col sm={3}>
              <Button onClick={() => this.toggleEndDate()}>+ Kết thúc</Button>
              </Col>}
            </FormGroup>

            {this.state.showEndDate? <FormGroup>
                <Col sm={3} style={{textAlign: 'right'}}>
                  Thời gian kết thúc
                </Col>
                <Col sm={4}>
                  <Datetime
                    defaultValue={new Date()}
                  />
                </Col>
                <Col sm={3}>
                  <Button onClick={() => this.toggleEndDate()}>- Hủy bỏ</Button>
                </Col>
              </FormGroup>: null}


            <FormGroup>
              <Col sm={3} style={{textAlign: 'right'}}>
                Chủ đề
              </Col>
              <Col sm={7}>
                <FormControl type="text" placeholder="Chọn chủ đề của sự kiện"></FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={3} style={{textAlign: 'right'}}>
                Mô tả
              </Col>
              <Col sm={7}>
                <FormControl type="text" placeholder="Thông tin chi tiết của sự kiện"></FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={3} style={{textAlign: 'right'}}>
                Yêu cầu
              </Col>
              <Col sm={7}>
                <FormControl type="text" placeholder="Yêu cầu cho người tham dự"></FormControl>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary">Tiếp tục</Button>
          <Button onClick={() => this.close()}>Hủy</Button>
        </Modal.Footer>
      </Modal>);
  }
}