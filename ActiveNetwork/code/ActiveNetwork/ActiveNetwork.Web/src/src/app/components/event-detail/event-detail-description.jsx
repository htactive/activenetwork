import React, {Component} from 'react';
import {HTMLEditorByMD} from '../html-editor-md';
import {ANEventDetailServiceInstance} from '../../services/anevent-detail-service';
import {userStore} from '../../store/user-store';
import {
  convertToRaw,
} from 'draft-js';

import {
  Editor,
  createEditorState,
} from 'medium-draft';


export class EventDetailDescriptionComponent extends Component {

  async getInfoData() {
    let eventInformation = await ANEventDetailServiceInstance.getANEventDetailInformation(this.eventId);
    let editorState = createEditorState();
    if (eventInformation.EventInformation.Description) {
      let objJson = null;
      try {
        JSON.parse(eventInformation.EventInformation.Description)
      }
      catch (e) {
      }
      if (objJson) {
        editorState = createEditorState(objJson);
      }
    }
    this.setState({
      event_description: editorState,
      isHost: (userStore.getState().currentUser || {}).Id == eventInformation.Host.Id
    });
  }

  componentWillMount() {
    this.setState({
      event_description: createEditorState(),
      isHost: false,
      isEditing: false
    });
    this.eventId = this.props.params.id;
  }

  componentWillReceiveProps(props) {
    this.eventId = props.params.id;
    this.getInfoData();
  }

  async componentDidMount() {
    await this.getInfoData();
  }

  onEventDescriptionChanged(editorState) {
    this.setState({event_description: editorState});
  }

  startEdit() {
    this.setState({isEditing: true});
  }

  async saveEdit() {
    let saveResult = await ANEventDetailServiceInstance.updateEventDescription({
      eventId: this.eventId,
      description: this.logData()
    });
    if (saveResult) {
      this.setState({isEditing: false});
    }
  }

  cancelEdit() {
    this.setState({isEditing: false});
  }

  logData() {
    const currentContent = this.state.event_description.getCurrentContent();
    const es = convertToRaw(currentContent);
    return JSON.stringify(es);
  }

  render() {
    return (<div className="row">
      <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <div className="widget">
          <div className="widget-header">
            <h3 className="widget-caption">Mô tả chi tiết cho sự kiện</h3>
            {this.state.isHost ?
              <span className="widget-buttons">

                {this.state.isEditing ?
                  <a className="btn btn-link" onClick={() => this.saveEdit()}><i className="fa fa-save"/> Lưu lại</a> :
                  <a className="btn btn-link" onClick={() => this.startEdit()}><i className="fa fa-pencil"/> Chỉnh
                    sửa</a>}

                {this.state.isEditing ?
                  <a className="btn btn-link" onClick={() => this.cancelEdit()}><i className="fa fa-times"/> Hủy bỏ</a>
                  : null}

              </span> : null}
          </div>
          <div className="widget-body bordered-top bordered-sky no-padding">

            <HTMLEditorByMD
              ref="editor"
              editorEnabled={this.state.isEditing}
              editorState={this.state.event_description}
              onChange={(e) => this.onEventDescriptionChanged(e)}
              placeholder={this.state.isEditing ? "Viết mô tả của bạn ở đây ..." : "(Chưa có mô tả cho sự kiện)"}
            />
          </div>
        </div>
      </div>
    </div>);
  }
}
