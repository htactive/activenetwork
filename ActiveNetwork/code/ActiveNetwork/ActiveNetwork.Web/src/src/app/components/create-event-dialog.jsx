import * as React from 'react';
var Datetime = require('react-datetime');
import {Modal, Button, Form, FormGroup, Col, FormControl} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Autocomplete from 'react-autocomplete';
import {getStates, matchStateToTerm, sortStates, styles, fakeRequest} from 'react-autocomplete/build/lib/utils'
import {GoogleAPIServiceInstance} from '../services/location-service'

export class CreateEventDialog extends React.Component {
  componentWillMount() {
    this.setState({
      startDate: '03/08/2017',
      isLocationLoading: false,
      locationList: [],
      event_coverImage: null,
      event_location: ''
    });
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

  onDrop(files) {
    if (files && files[0]) {
      this.setState({
        file: files[0]
      });
    }
  }

  toggleEndDate() {
    this.setState({
      showEndDate: !this.state.showEndDate,
    });
  }

  componentDidMount() {
    let resizeFunc = function () {
      setTimeout(function () {
        let container = $('.cover-image-upload-zone .full-zone .image-preview');
        if (container.length > 0) {
          let width = container.width();
          container.height(width * 0.52)
        }
        resizeFunc();
      }, 200);
    };
    resizeFunc();
  }

  renderItems(items) {
    return items.map((item, index) => {
      return item;
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
                Ảnh sự kiện
              </div>
              <div className="col-sm-7">
                <Dropzone
                  className="cover-image-upload-zone"
                  accept="image/*"
                  onDrop={(file) => this.onDrop(file)}
                  multiple={false}
                >
                  {this.state.file == null ?
                    <div className="empty-zone">Kéo và thả hình của bạn vào đây hoặc click để chọn hình.</div>
                    :
                    <div className="full-zone">
                      <button onClick={(e) => this.removeCoverImage(e)}
                              className="btn-remove btn btn-default btn-circle btn-xs"><i className="fa fa-remove"/>
                      </button>
                      <div className="image-preview">
                        <img src={this.state.file.preview}/>
                      </div>
                    </div>
                  }
                </Dropzone>
              </div>
            </div>
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
                {/*<input type="text" className="form-control" id="eventplace" placeholder="Nhập một địa điểm"/>*/}
                <Autocomplete
                  wrapperProps={{className: "event-location"}}
                  wrapperStyle={{width: "100%"}}
                  value={this.state.event_location}
                  inputProps={{
                    name: "Event Location",
                    id: "eventplace",
                    className: "form-control",
                    placeholder: "Nhập một địa điểm"
                  }}
                  items={this.state.locationList}
                  getItemValue={(item) => item.Address}
                  onSelect={(value, state) => this.setState({event_location: value, locationList: [state]}) }
                  onChange={(event, value) => this.eventLocationOnChange(event, value)}
                  renderItem={(item, isHighlighted) => (
                    <div
                      style={isHighlighted ? styles.highlightedItem : styles.item}
                      key={item.Id}
                      id={item.Id}
                    >{item.Name}</div>
                  )}
                  renderMenu={(items, value, style) => (
                    <div className="menu" style={[styles.menu, style]}>
                      {value === '' ? (
                        <div style={{padding: 6}}>Gõ tên một địa điểm bất kì</div>
                      ) : this.state.isLocationLoading ? (
                        <div style={{padding: 6}}>Loading...</div>
                      ) : this.renderItems(items)}
                    </div>
                  )}
                />
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

            <div className="form-group" style={{marginTop: 20}}>
              <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                Chủ đề
              </div>
              <div className="col-sm-7">
                <textarea className="form-control" rows="2" placeholder="Chọn chủ đề của sự kiện"/>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                Mô tả
              </div>
              <div className="col-sm-7">
                <textarea className="form-control" rows="4" placeholder="Thông tin chi tiết của sự kiện"/>
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

  removeCoverImage(e) {
    e.stopPropagation();
    this.setState({file: null});
  }

  async eventLocationOnChange(event, value) {
    this.setState({event_location: value, isLocationLoading: true});
    let items = await GoogleAPIServiceInstance.searchPlaces(value);
    items.push({Id: '__ju__', Name: 'Chỉ dùng "' + value + '"', Address: value})
    this.setState({locationList: items, isLocationLoading: false});
  }
}