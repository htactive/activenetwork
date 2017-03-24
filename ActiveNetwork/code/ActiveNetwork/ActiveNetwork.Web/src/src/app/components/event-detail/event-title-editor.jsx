import React, {Component} from 'react';
import {ANEventDetailServiceInstance} from '../../services/anevent-detail-service';


export class EventTitleEditor extends Component {
  componentWillMount() {
    this.setState({
      isEditing: false,
      EventTitle: '',
      edit_EventTitleInvalid: false,
      edit_EventTitleInvalidMessage: '',
      isHost: false
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      isHost: props.isHost,
      EventTitle: props.EventTitle,
      edit_EventTitle: props.EventTitle,
    });
  }

  render() {
    if (this.state.isEditing && this.state.isHost) {
      return (
        <div className="input-group col-md-10 col-lg-10 col-xs-10 col-sm-10 over-editor">
          <input type="text" className="form-control event-title-editor-input" placeholder="Gõ tiêu đề cho sự kiện"
                 defaultValue={this.state.edit_EventTitle}
                 onChange={(e) => {
                   let val = e.target.value;
                   this.setState({edit_EventTitle: val});
                   this.validateEventTitle(val);
                 }}
          />
          <div className="input-group-btn">
            <button type="button" className="btn btn-default" aria-label="Lưu" onClick={() => this.saveEdit()}>
              <i className="fa fa-check"/></button>
            <button type="button" className="btn btn-default" aria-label="Hủy" onClick={() => this.cancelEdit()}>
              <i className="fa fa-times"/></button>
          </div>
        </div>

      );
    }
    return (
      <a href="" onClick={(e) => {
        e.preventDefault();
        this.editClick();
      }}>{this.state.EventTitle}</a>);
  }

  editClick() {
    this.setState({
      isEditing: true
    },()=>{
      $('.name .event-title-editor-input').focus();
      $('.name .event-title-editor-input').select();
    });
  }

  cancelEdit() {
    this.setState({
      isEditing: false,
      edit_EventTitle: this.state.EventTitle,
      edit_EventTitleInvalid: false,
      edit_EventTitleInvalidMessage: ''
    });
  }

  validateEventTitle(val) {
    return true;
  }

  async saveEdit() {
    if (!this.validateEventTitle(this.state.edit_EventTitle)) return;
    let obj = {
      title: this.state.edit_EventTitle,
      eventId: this.props.eventId
    };
    let saveResult = await ANEventDetailServiceInstance.updateEventTitle(obj);
    if (saveResult) {
      (this.props.afterSaveChanged || (e => {
      }))(obj);
      this.setState({
        isEditing: false
      });
    }
  }
}