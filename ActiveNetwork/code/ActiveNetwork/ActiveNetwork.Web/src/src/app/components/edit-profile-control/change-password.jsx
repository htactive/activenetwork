import React, {Component} from 'react';
import {UserServiceInstance} from '../../services/user-service';

export class ChangePassword extends Component {
  componentWillMount() {
    this.setState({
      oldPassword: '',
      oldPassword_IsInvalid: '',
      oldPassword_InvalidMessage: '',
      newPassword: '',
      newPassword_IsInvalid: '',
      newPassword_InvalidMessage: '',
      confirmPassword: '',
      confirmPassword_IsInvalid: '',
      confirmPassword_InvalidMessage: '',
    })
  }

  render() {
    return (
      <div className="form-horizontal" role="form">
        <fieldset>
          <h3><i className="fa fa-square"/> Đổi mật khẩu</h3>
          <div className={`form-group${this.state.oldPassword_IsInvalid ? ' has-error' : ''}`}>
            <label htmlFor="old-password" className="col-sm-3 control-label">Mật khẩu hiện tại</label>
            <div className="col-sm-4">
              <input type="password" className="form-control"
                     onChange={(v) => {
                       let val = v.target.value;
                       this.setState({oldPassword: val});
                       this.validateOldPassword(val);
                     }}
              />
              {this.state.oldPassword_IsInvalid ?
                <span className="help-block">{this.state.oldPassword_InvalidMessage}</span> : null}
            </div>
          </div>
          <hr/>
          <div className={`form-group${this.state.newPassword_IsInvalid ? ' has-error' : ''}`}>
            <label htmlFor="password" className="col-sm-3 control-label">Mật khẩu mới</label>
            <div className="col-sm-4">
              <input type="password" className="form-control"
                     onChange={(v) => {
                       let val = v.target.value;
                       this.setState({newPassword: val});
                       this.validateNewPassword(val);
                       this.validateConfirmPassword(this.state.confirmPassword, val);
                     }}/>
              {this.state.newPassword_IsInvalid ?
                <span className="help-block">{this.state.newPassword_InvalidMessage}</span> : null}
            </div>
          </div>
          <div className={`form-group${this.state.confirmPassword_IsInvalid ? ' has-error' : ''}`}>
            <label htmlFor="password2" className="col-sm-3 control-label">Nhập lại mật khẩu</label>
            <div className="col-sm-4">
              <input type="password" className="form-control"
                     onChange={(v) => {
                       let val = v.target.value;
                       this.setState({confirmPassword: val});
                       this.validateConfirmPassword(val, this.state.newPassword);
                     }}
              />

              {this.state.confirmPassword_IsInvalid ?
                <span className="help-block">{this.state.confirmPassword_InvalidMessage}</span> : null}
            </div>
          </div>
        </fieldset>

        <p className="text-center">
          <a href="#" className="btn btn-custom-primary" onClick={() => this.changePasswordClick()}><i
            className="fa fa-floppy-o"/> Lưu thay đổi</a></p>
      </div>);
  }

  validateOldPassword(val) {
    if (val === undefined || val == null || val === '') {
      this.setState({
        oldPassword_IsInvalid: false,
        oldPassword_InvalidMessage: ''
      });
      return true;
    }

    if (val.length < 6) {
      this.setState({
        oldPassword_IsInvalid: true,
        oldPassword_InvalidMessage: 'Mật khẩu tối thiểu 6 ký tự'
      });
      return false;
    }
    this.setState({
      oldPassword_IsInvalid: false,
      oldPassword_InvalidMessage: ''
    });
    return true;
  }

  validateNewPassword(val) {
    if (val === undefined || val == null || val === '') {
      this.setState({
        newPassword_IsInvalid: false,
        newPassword_InvalidMessage: ''
      });
      return true;
    }

    if (val.length < 6) {
      this.setState({
        newPassword_IsInvalid: true,
        newPassword_InvalidMessage: 'Mật khẩu tối thiểu 6 ký tự'
      });
      return false;
    }
    this.setState({
      newPassword_IsInvalid: false,
      newPassword_InvalidMessage: ''
    });
    return true;
  }

  validateConfirmPassword(confirmPassword, newPassword) {
    if (newPassword == undefined || newPassword == null || newPassword === ''
      || confirmPassword == undefined || confirmPassword == null || confirmPassword === '') {
      this.setState({
        confirmPassword_IsInvalid: false,
        confirmPassword_InvalidMessage: ''
      });
      return true;
    }
    if (newPassword !== confirmPassword) {
      this.setState({
        confirmPassword_IsInvalid: true,
        confirmPassword_InvalidMessage: 'Nhập lại mật khẩu không trùng khớp'
      });
      return false;
    }
    this.setState({
      confirmPassword_IsInvalid: false,
      confirmPassword_InvalidMessage: ''
    });
    return true;
  }

  async changePasswordClick() {
    let isNewPasswordValid = this.validateNewPassword(this.state.newPassword),
      isOldPasswordValid = this.validateOldPassword(this.state.oldPassword),
      isConfirmPasswordValid = this.validateConfirmPassword(this.state.confirmPassword);
    if (isNewPasswordValid && isOldPasswordValid && isConfirmPasswordValid) {
      let updateResult = await UserServiceInstance.changePassword({password:this.state.oldPassword,newPassword:this.state.newPassword});
      if(!updateResult){
        this.setState({oldPassword_IsInvalid:true, oldPassword_InvalidMessage:'Mật khẩu hiện tại không đúng'});
      }
    }
  }
}
