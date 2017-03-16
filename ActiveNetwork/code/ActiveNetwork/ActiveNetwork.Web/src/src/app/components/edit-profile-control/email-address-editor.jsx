import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../../services/user-profile-service';
import {Validation} from '../../../commons/validate-helper';

export class EmailAdressEditor extends Component {
  componentWillMount() {
    this.setState({
      isEditing: false,
      email: '',
      edit_emailInvalid: false,
      edit_emailInvalidMessage: ''
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      email: props.email,
      edit_email: props.email,
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3">Thư điện tử</span>
          <div className="form-horizontal col-lg-9 col-md-9">
            <div
              className={`form-group no-margin col-lg-12 col-md-12${this.state.edit_emailInvalid ? ' has-error' : ''}`}>
              <input type="text" className="form-control" placeholder="Thư điện tử"
                     defaultValue={this.state.edit_email}
                     onChange={(e) => {
                       let val = e.target.value;
                       this.setState({edit_email: val});
                       this.validateEmail(val);
                     }}
              />
              {this.state.edit_emailInvalid ?
                <span className="help-block">{this.state.edit_emailInvalidMessage}</span> : null}
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
          <span className="data-name col-lg-3 col-md-3">Thư điện tử</span>
          <div className="col-lg-9 col-md-9">
            <a href={`mailto:${this.state.email}`} className="data-value">{this.state.email}</a>
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
      edit_email: this.state.email,
      edit_emailInvalid: false,
      edit_emailInvalidMessage: ''
    });
  }

  validateEmail(val) {
    if (!Validation.emailValidator(val)) {
      this.setState({
        edit_emailInvalid: true,
        edit_emailInvalidMessage: 'Định dạng thư điện tử không chính xác'
      });
      return false;
    }
    this.setState({edit_emailInvalid: false});
    return true;
  }

  async saveEdit() {
    if (!this.validateEmail(this.state.edit_email)) return;
    let obj = {
      email: this.state.edit_email,
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