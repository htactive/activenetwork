import * as React from 'react';
var Datetime = require('react-datetime');
import {Modal, Button} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Autocomplete from 'react-autocomplete';
import Select from 'react-select';
import {getStates, matchStateToTerm, sortStates, styles, fakeRequest} from 'react-autocomplete/build/lib/utils'
import {GoogleAPIServiceInstance} from '../services/location-service'
import {ANEventServiceInstance} from '../services/anevent-service';

import {
  createEditorState,
} from 'medium-draft';
import {HTMLEditorByMD} from '../components/html-editor-md';

export class CreateEventDialog extends React.Component {
  componentWillMount() {
    this.setState({
      title: "",
      startDate: new Date(),
      endDate: '',
      isLocationLoading: false,
      locationList: [],
      topicList: [],
      event_coverImage: null,
      event_locationDisplay: '',
      event_location: {},
      event_topics: [],
      event_description: createEditorState(),
      event_description_placeholder: "Viết mô tả ngắn gọn về sự kiện"
    });
  }

  async componentDidMount() {
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
    await this.loadTopics();
  }

  async loadTopics() {
    let topics = await ANEventServiceInstance.getAllCategories();
    this.setState({topicList: topics});
  }

  onEventDescriptionChanged(editorState) {
    this.setState({event_description: editorState});
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
              <label className="col-sm-3 control-label">Ảnh sự kiện</label>
              <div className="col-sm-9">
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
              <div className="col-sm-9">
                <input type="text" className="form-control" 

                      defaultValue={this.state.title}
                                   onChange={(v) => this.titleOnChange(v)}
                      placeholder="Nhập vào tên của sự kiện"/>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-3" style={{textAlign: 'right', paddingTop: 10}}>
                Địa điểm
              </div>
              <div className="col-sm-9">
                <Autocomplete
                  wrapperProps={{className: "event-location"}}
                  wrapperStyle={{width: "100%"}}
                  value={this.state.event_locationDisplay}
                  inputProps={{
                    name: "Event Location",
                    id: "eventplace",
                    className: "form-control",
                    placeholder: "Nhập một địa điểm"
                  }}
                  items={this.state.locationList}
                  getItemValue={(item) => item.Id}
                  onSelect={(value, state) => this.eventLocationOnSelect(value,state) }
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
                  onChange={(value)=>this.startDateOnSelect(value)}
                  dateFormat="DD/MM/YYYY"
                  id="StartDate"
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
                  onSelect={(value)=>this.endDateOnSelect(value)}
                   dateFormat="DD/MM/YYYY"
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
              <div className="col-sm-9">
                <Select multi value={this.state.event_topics} placeholder="Gõ để chọn chủ đề"
                        options={this.state.topicList}
                        optionRenderer={(obj) =>
                          (
                            <div className="user-block">
                              <img className="img-circle" src={"/img/Likes/likes-1.png"} alt={obj.Name}/>
                              <span className="username">{obj.Name}</span>
                              <span className="description">{obj.Description}</span>
                            </div>
                          )}
                        filterOption={(obj, text) => {
                          if (text === undefined || text === null || text === '') return true;
                          text = text.toLowerCase();
                          return obj.Name.toLowerCase().indexOf(text) > -1 || obj.Description.toLowerCase().indexOf(text) > -1;
                        }}
                        labelKey={"Name"}
                        valueKey={"Id"}
                        onChange={(v) => this.topicsOnChanged(v)}
                />

              </div>
            </div>
            <hr/>
            <div className="form-group">
              <div className="col-sm-12 text-center"><h3>Mô tả về sự kiện</h3></div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <HTMLEditorByMD
                  editorState={this.state.event_description}
                  placeholder={this.state.event_description_placeholder}
                  onChange={(editorState, callback = null) => {
                    this.setState({event_description: editorState}, () => {
                      if (callback) {
                        callback();
                      }
                    });
                  }}/>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={() => this.createEvent()}>Tạo sự kiện</Button>
          <Button onClick={() => this.close()}>Hủy</Button>
        </Modal.Footer>
      </Modal>);
  }

  removeCoverImage(e) {
    e.stopPropagation();
    this.setState({file: null});
  }

  async eventLocationOnChange(event, value) {
    this.setState({event_locationDisplay: value, isLocationLoading: true});
    let items = await GoogleAPIServiceInstance.searchPlaces(value);
    items.push({Id: '__ju__', Name: 'Chỉ dùng "' + value + '"', Address: value})
    this.setState({locationList: items, isLocationLoading: false});
  }
  eventLocationOnSelect(value, state)
  {
    this.setState({event_location: state,
      event_locationDisplay: state.Name,
       locationList: [state]});

  }
  topicsOnChanged(v) {
    this.setState({event_topics: v});
    console.log(v);
  }
  titleOnChange(v){
    this.setState({title: v.target.value});
    console.log(v.target.value);
  }
  startDateOnSelect(v){
    
    this.setState({startDate: v._d});
    console.log(v._d);
  }
  endDateOnSelect(v){
    this.setState({endDate: v.toObject()});
  }
 async createEvent(){
     
      let uploadResult = await ANEventServiceInstance.uploadCoverPhoto({cover: this.state.file});
      if (uploadResult) {
        let model = {
          Information: {
            ANEventLocation: {
              GGId: this.state.event_location.Id,
              Name: this.state.event_location.Name,
              Address: this.state.event_location.Address,
              Lat: this.state.event_location.location != null ? this.state.event_location.location.lat : '',
              Lng: this.state.event_location.location != null ? this.state.event_location.location.lng : ''
            },
            Description: "",
            Title: this.state.title,
            StartDate: this.state.startDate,
            EndDate: this.state.EndDate
          },
          Categories: this.state.event_topics,
          CoverPhoto: {Id: uploadResult.Id}
        };
        console.log(model);
        let result = await ANEventServiceInstance.createANEvent(model);
        if (result) {
          this.close();
        }
      }
     
  }
}