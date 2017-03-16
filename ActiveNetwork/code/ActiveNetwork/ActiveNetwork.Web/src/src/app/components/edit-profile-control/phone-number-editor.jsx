import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../../services/user-profile-service';
import {Validation} from '../../../commons/validate-helper';

export class PhoneNumberEditor extends Component {
  componentWillMount() {
    this.setState({
      isEditing: false,
      phone: '',
      edit_phoneInvalid: false,
      edit_phoneInvalidMessage: ''
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      phone: props.phone,
      edit_phone: props.phone,
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3">Số điện thoại</span>
          <div className="form-horizontal col-lg-9 col-md-9">
            <div
              className={`form-group no-margin col-lg-12 col-md-12${this.state.edit_phoneInvalid ? ' has-error' : ''}`}>
              <input type="text" className="form-control" placeholder="Số điện thoại"
                     defaultValue={this.state.edit_phone}
                     onChange={(e) => {
                       let val = e.target.value;
                       this.setState({edit_phone: val});
                       this.validatePhone(val);
                     }}
              />
              {this.state.edit_phoneInvalid ?
                <span className="help-block">{this.state.edit_phoneInvalidMessage}</span> : null}
            </div>
            <div className="col-lg-12 col-md-12 edit-menu">
              <button className="btn btn-primary" onClick={() => this.saveEdit()}> Lưu thay đổi</button>
              <button className="btn btn-default" onClick={() => this.cancelEdit()}> Hủy</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3">Số điện thoại</span>
          <div className="col-lg-9 col-md-9">
            <a href={`mailto:${this.state.phone}`} className="data-value">{this.state.phone}</a>
            <span className="data-action">
            <a className="btn btn-link" onClick={() => this.editClick()}><i className="fa fa-edit"/> Chỉnh sửa</a>
          </span></div>
        </div>
      </div>);
  }

  editClick() {
    this.setState({
      isEditing: true
    });
  }

  cancelEdit() {
    this.setState({
      isEditing: false,
      edit_phone: this.state.phone,
      edit_phoneInvalid: false,
      edit_phoneInvalidMessage: ''
    });
  }

  validatePhone(val) {
    if (!Validation.validatePhoneNumber(val)) {
      this.setState({
        edit_phoneInvalid: true,
        edit_phoneInvalidMessage: 'Định dạng số điện thoại không chính xác'
      });
      return false;
    }
    this.setState({edit_phoneInvalid: false});
    return true;
  }

  async saveEdit() {
    if (!this.validatePhone(this.state.edit_phone)) return;
    let obj = {
      phone: this.state.edit_phone,
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