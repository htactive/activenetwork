import * as React from 'react';
var Datetime = require('react-datetime');
import {Modal, Button, Radio} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Autocomplete from 'react-autocomplete';
import Select from 'react-select';
import {getStates, matchStateToTerm, sortStates, styles, fakeRequest} from 'react-autocomplete/build/lib/utils'
import {GoogleAPIServiceInstance} from '../services/location-service'
import {ANEventServiceInstance} from '../services/anevent-service';

// import {
//   createEditorState,
//   convertToRaw
// } from 'medium-draft';
// import {HTMLEditorByMD} from '../components/html-editor-md';

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
      event_description_short: "",
      event_description_short_placeholder: "Viết mô tả ngắn gọn về sự kiện",
      isShowAdvance: false,
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

  // onEventDescriptionChanged(editorState) {
  //   this.setState({event_description: editorState});
  // }

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
              <label className="col-sm-3 control-label">HÌnh nền</label>
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
              <label className="col-sm-3 control-label">Tên</label>
              <div className="col-sm-9">
                <input type="text" className="form-control"

                       defaultValue={this.state.title}
                       onChange={(v) => this.titleOnChange(v)}
                       placeholder="Nhập vào tên của sự kiện"/>
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-3 control-label">Địa điểm</label>
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
                  onSelect={(value, state) => this.eventLocationOnSelect(value, state) }
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
              <label className="col-sm-3 control-label">Thời gian</label>
              <div className="col-sm-4">
                <Datetime
                  defaultValue={new Date()}
                  onChange={(value) => this.startDateOnSelect(value)}
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
                <label className="col-sm-3 control-label">Kết thúc</label>
                <div className="col-sm-4">
                  <Datetime
                    defaultValue={new Date()}
                    onSelect={(value) => this.endDateOnSelect(value)}
                    dateFormat="DD/MM/YYYY"
                  />
                </div>
                <div className="col-sm-3">
                  <Button onClick={() => this.toggleEndDate()}>- Hủy bỏ</Button>
                </div>
              </div> : null}

            <div className="form-group" style={{marginTop: 20}}>
              <label className="col-sm-3 control-label">Chủ đề</label>
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

            <div className="form-group">
              <label className="col-sm-3 control-label">Mô tả ngắn gọn</label>
              <div className="col-sm-9">
                <textarea
                  style={{width: '100%', resize: 'none'}}
                  rows="2"
                  value={this.state.event_description_short}
                  placeholder={this.state.event_description_short_placeholder}
                  onChange={v => {
                    let val = v.target.value;
                    this.setState({event_description_short: val});
                  }}/>
              </div>
            </div>

            {this.state.isShowAdvance ?
              <div>
                <hr/>

                <div className="form-group">
                  <div className="col-sm-12 text-center"><h3>Mô tả chi tiết về sự kiện</h3></div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                <textarea
                  style={{width: '100%', resize: 'none'}}
                  rows="5"
                />
                  </div>
                </div>

                <hr/>

                <div className="form-group">
                  <label className="col-sm-3 control-label">Yêu cầu đối với người tham gia</label>

                  <div className="col-sm-8" style={{marginLeft: '30px'}}>
                    <div className="checkbox">
                      <label> <input type="checkbox" value="emailRequired"
                                     onChange={(e)=> this.setState({requirement: {email : e.target["checked"]}})}/>
                        Đã xác nhận email
                      </label>
                    </div>

                    <div className="checkbox">
                      <label> <input type="checkbox" value="phoneRequired"
                                     onChange={(e)=> this.setState({requirement: {phone : e.target["checked"]}})}/>
                        Đã xác nhận số điện thoại
                      </label>
                    </div>

                    <div className="checkbox">
                      <label> <input type="checkbox" value="ageRequired"
                                     onChange={(e)=> this.setState({requirement: {age : e.target["checked"]}})}/>
                        Đã xác nhận tuổi
                      </label>
                    </div>

                    <div className="checkbox">
                      <label> <input type="checkbox" value="addressRequired"
                                     onChange={(e)=> this.setState({requirement: {address : e.target["checked"]}})}/>
                        Đã xác nhận địa chỉ
                      </label>
                    </div>
                  </div>
                </div>

                <hr/>

                <div className="form-group">
                  <label className="col-sm-3 control-label">Đăng bài viết</label>

                  <div className="col-sm-8" style={{marginLeft: '30px'}}>
                    <Radio name="postPermission" defaultChecked>
                      Chỉ chủ sở hữu có quyền đăng
                    </Radio>
                    <Radio name="postPermission">
                      Chủ sở hữu và thành viên có quyền đăng
                    </Radio>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label">Duyệt yêu cầu</label>

                  <div className="col-sm-8" style={{marginLeft: '30px'}}>
                    <Radio name="approvePermission" defaultChecked>
                      Chỉ chủ sở hữu có quyền duyệt yêu cầu tham gia sự kiện
                    </Radio>
                    <Radio name="approvePermission">
                      Thành viên cũng có quyền duyệt yêu cầu tham gia sự kiện
                    </Radio>
                  </div>
                </div>
              </div>
              : null}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-md-6 text-left">
            <Button bsStyle="success" onClick={() => {
              this.setState({isShowAdvance: !this.state.isShowAdvance})
            }}>Tùy chọn</Button>
          </div>
          <div className="col-md-6">
            <Button bsStyle="primary" onClick={() => this.createEvent()}>Tạo sự kiện</Button>
            <Button onClick={() => this.close()}>Hủy</Button>
          </div>
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

  eventLocationOnSelect(value, state) {
    this.setState({
      event_location: state,
      event_locationDisplay: state.Name,
      locationList: [state]
    });

  }

  topicsOnChanged(v) {
    this.setState({event_topics: v});
    console.log(v);
  }

  titleOnChange(v) {
    this.setState({title: v.target.value});
    console.log(v.target.value);
  }

  startDateOnSelect(v) {

    this.setState({startDate: v._d});
    console.log(v._d);
  }

  endDateOnSelect(v) {
    this.setState({endDate: v.toObject()});
  }

  async createEvent() {
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
          EndDate: this.state.EndDate,
          ShortDescription: this.state.event_description_short
        },
        Categories: this.state.event_topics,
        CoverPhoto: {Id: uploadResult.Id}
      };
      let result = await ANEventServiceInstance.createANEvent(model);
      if (result) {
        this.close();
      }
    }
  }
}