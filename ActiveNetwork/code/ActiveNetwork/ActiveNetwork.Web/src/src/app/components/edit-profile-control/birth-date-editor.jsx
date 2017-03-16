import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../../services/user-profile-service';
import DatePicker from 'react-datepicker';
var moment = require('moment');

export class BirthdayEditor extends Component {
  componentWillMount() {
    this.setState({
      isEditing: false,
      birthDate: null
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      birthDate: props.birthDate,
      edit_birthDate: props.birthDate ? moment(props.birthDate) : moment(),
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3">Ngày sinh</span>
          <div className="form-horizontal col-lg-9 col-md-9">
            <DatePicker
              selected={this.state.edit_birthDate}
              className="form-control"
              showYearDropdown
              dateFormatCalendar="MMMM"
              minDate={moment("1900-01-01")}
              maxDate={moment()}
              onChange={(e) => this.setState({edit_birthDate: e})}
            />
            <div className="col-lg-12 col-md-12 edit-menu">
              <button className="btn btn-primary" onClick={() => this.saveEdit()}> Lưu thay đổi</button>
              <button className="btn btn-default" onClick={() => this.cancelEdit()}> Hủy</button>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.birthDate == null) {
      return (
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3">Ngày sinh</span>
          <div className="col-lg-9 col-md-9">
            <a
              className="btn btn-link" onClick={() => this.editClick()}><i className="fa fa-plus"/> Cung cấp ngày
              sinh</a>
          </div>
        </div>
      );
    }
    return (
      <div className="row data-row">
        <span className="data-name col-lg-3 col-md-3">Ngày sinh</span>
        <div className="col-lg-9 col-md-9">
          <span
            className="data-value">{`Ngày ${this.state.birthDate.getDate()} tháng ${this.state.birthDate.getMonth() + 1} năm ${this.state.birthDate.getFullYear()}`}</span>
          <span className="data-action">
            <a className="btn btn-link" onClick={() => this.editClick()}><i className="fa fa-edit"/> Chỉnh sửa</a>
          </span></div>
      </div>);
  }

  editClick() {
    this.setState({
      isEditing: true
    });
  }

  cancelEdit() {
    this.setState({
      isEditing: false
    });
  }

  async saveEdit() {
    let obj = {
      birthDate: this.state.edit_birthDate._d
    };
    let saveResult = await UserProfileServiceInstance.updateMyProfile(obj);
    if (saveResult) {
      (this.props.afterSaveChanged || (e => {
      }))(obj);
      this.setState({
        isEditing: false
      });
    }
  }
}