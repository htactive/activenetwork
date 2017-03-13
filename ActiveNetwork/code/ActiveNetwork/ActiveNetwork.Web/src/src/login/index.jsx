import React, {Component} from 'react';
import {UserServiceInstance} from './services/user-service';
import {Validation} from '../commons/validate-helper';
export class Login extends Component {
  componentWillMount() {
    this.setState({
      email: 'test@sss.com',
      password: '123456',
      hasError: false,
      register_firstName: '',
      register_firstName_isInvalid: false,
      register_firstName_invalidMessage: '',
      register_lastName: '',
      register_lastName_isInvalid: false,
      register_lastName_invalidMessage: '',
      register_middleName: '',
      register_email: '',
      register_email_isInvalid: false,
      register_email_invalidMessage: '',
      register_password: '',
      register_password_isInvalid: false,
      register_password_invalidMessage: '',
      register_confirmPassword: '',
      register_confirmPassword_isInvalid: false,
      register_confirmPassword_invalidMessage: '',
    });
  }

  render() {
    return (
      <div className="wrapper">

        <div className="parallax filter-black">
          <div className="parallax-image"></div>
          <div className="small-info">
            <div className="col-sm-10 col-sm-push-1 col-md-6 col-md-push-3 col-lg-6 col-lg-push-3">
              <div className="card-group animated flipInX">
                <div className="card">
                  <div className="card-block">
                    <div className="center">
                      <h4 className="m-b-0"><span className="icon-text">Login</span></h4>
                      <p className="text-muted">Access your account</p>
                      {this.state.hasError ?
                        <div className="alert alert-danger" role="alert">
                          <button type="button" className="close" onClick={() => this.setState({hasError: false})}><span
                            aria-hidden="true">&times;</span></button>
                          <strong>Lỗi!</strong> {this.state.message}
                        </div> : null}
                    </div>
                    <div className="form-group">
                      <input type="email" defaultValue={this.state.email} className="form-control"
                             placeholder="Email Address" onChange={(v) => {
                        this.setState({email: v.target["value"]});
                      }}/>
                    </div>
                    <div className="form-group">
                      <input type="password" defaultValue={this.state.password} className="form-control"
                             placeholder="Password" onChange={(v) => {
                        this.setState({password: v.target["value"]});
                      }}/>
                      <a href="#" className="pull-xs-right">
                        <small>Forgot?</small>
                      </a>
                      <div className="clearfix"></div>
                    </div>
                    <div className="center">
                      <button onClick={() => this.loginClick()} className="btn  btn-azure">
                        Login
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-block center">
                    <h4 className="m-b-0">
                      <span className="icon-text">Đăng ký</span>
                    </h4>
                    <p className="text-muted">Tạo mới tài khoản</p>
                    <div className="col-lg-12 col-md-12">
                      <div className=" form-horizontal register-form">
                        <div className="form-group">
                          <div
                            className={`col-lg-4 col-md-4 no-padding${this.state.register_lastName_isInvalid ? ' has-error' : ''}`}>
                            <input type="text" className="form-control" placeholder="Họ"
                                   defaultValue={this.state.register_lastName}
                                   onChange={(v) => {
                                     let val = v.target.value;
                                     this.setState({register_lastName: val});
                                     this.checkLastName(val);
                                   }}
                            />
                            {this.state.register_lastName_isInvalid ?
                              <span className="help-block">{this.state.register_lastName_invalidMessage}</span> : null}
                          </div>
                          <div className="col-lg-4 col-md-4 no-padding">
                            <input type="text" className="form-control" placeholder="Đệm"
                                   defaultValue={this.state.register_middleName}
                                   onChange={(v) => this.setState({register_middleName: v.target.value})}

                            />
                          </div>
                          <div
                            className={`col-lg-4 col-md-4 no-padding${this.state.register_firstName_isInvalid ? ' has-error' : ''}`}>
                            <input type="text" className="form-control" placeholder="Tên"
                                   defaultValue={this.state.register_firstName}
                                   onChange={(v) => {
                                     let val = v.target.value
                                     this.setState({register_firstName: val});
                                     this.checkFirstName(val);
                                   }}
                            />
                            {this.state.register_firstName_isInvalid ?
                              <span className="help-block">{this.state.register_firstName_invalidMessage}</span> : null}
                          </div>
                        </div>
                        <div className={`form-group${this.state.register_email_isInvalid ? ' has-error' : ''}`}>
                          <input type="email" className="form-control" placeholder="Email"
                                 defaultValue={this.state.register_email}
                                 onChange={(v) => {
                                   let val = v.target.value;
                                   this.setState({register_email: val});
                                   this.checkEmail(val);
                                 }}
                          />
                          {this.state.register_email_isInvalid ?
                            <span className="help-block">{this.state.register_email_invalidMessage}</span> : null}
                        </div>
                        <div className={`form-group${this.state.register_password_isInvalid ? ' has-error' : ''}`}>
                          <input type="password" className="form-control" placeholder="Mật khẩu"
                                 onChange={(v) => {
                                   let val = v.target.value;
                                   this.setState({register_password: val});
                                   this.checkPassword(val);
                                   if (this.state.register_confirmPassword) {
                                     this.checkConfirmPassword(this.state.register_confirmPassword, val);
                                   }
                                 }}
                          />
                          {this.state.register_password_isInvalid ?
                            <span className="help-block">{this.state.register_password_invalidMessage}</span> : null}
                        </div>
                        <div
                          className={`form-group${this.state.register_confirmPassword_isInvalid ? ' has-error' : ''}`}>
                          <input type="password" className="form-control" placeholder="Nhập lại mật khẩu"
                                 onChange={(v) => {
                                   let val = v.target.value;
                                   this.setState({register_confirmPassword: val});
                                   this.checkConfirmPassword(val, this.state.register_password);
                                 }}
                          />
                          {this.state.register_confirmPassword_isInvalid ?
                            <span
                              className="help-block">{this.state.register_confirmPassword_invalidMessage}</span> : null}
                        </div>
                        <button className="btn btn-azure" onClick={() => this.registerClick()}>Tạo tài khoản</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="container">
            <p className="text-muted"> Copyright © Company - All rights reserved </p>
          </div>
        </footer>
      </div>);
  }

  async loginClick() {
    let username = this.state.email,
      password = this.state.password,
      isRememberMe = true;

    let loginResult = await UserServiceInstance.login(username, password, isRememberMe);
    if (loginResult && loginResult.Id > 0) {
      localStorage.setItem("user", JSON.stringify(loginResult));
      window.location.href = '/';
    }
    else {
      this.messageLoginFailed();
    }
  }

  messageLoginFailed() {
    this.setState({
      hasError: true,
      message: 'Sai tên đăng nhập hoặc mật khẩu'
    })
  }

  async registerClick() {
    let emailIsValid = this.checkEmail(this.state.register_email),
      firstNameIsValid = this.checkFirstName(this.state.register_firstName),
      lastNameIsValid = this.checkLastName(this.state.register_lastName),
      passwordIsValid = this.checkPassword(this.state.register_password),
      confirmPasswordIsValid = this.checkConfirmPassword(this.state.register_confirmPassword, this.state.register_password);

    if (emailIsValid
      && firstNameIsValid
      && lastNameIsValid
      && passwordIsValid
      && confirmPasswordIsValid
    ) {
      let registerResult = await UserServiceInstance.registerNewUser({
        email: this.state.register_email,
        firstName: this.state.register_firstName,
        lastName: this.state.register_lastName,
        middleName: this.state.register_middleName,
        password: this.state.register_password
      });
      if(registerResult.IsSuccessed){
        localStorage.setItem("user", JSON.stringify(registerResult.User));
        window.location.href = '/';
      }
    }
  }

  checkEmail(val) {
    if (!Validation.validateNull(val)) {
      this.setState({register_email_isInvalid: true});
      this.setState({register_email_invalidMessage: 'Bạn phải nhập email'});
      return false;
    }
    else if (!Validation.validateEmail(val)) {
      this.setState({register_email_isInvalid: true});
      this.setState({register_email_invalidMessage: 'Email chưa đúng định dạng'});
      return false;
    }
    else {
      this.setState({register_email_isInvalid: false});
      this.setState({register_email_invalidMessage: ''});
      return true;
    }
  }

  checkPassword(val) {
    if (!Validation.validateLength(val, 6)) {
      this.setState({register_password_isInvalid: true});
      this.setState({register_password_invalidMessage: 'Mật khẩu phải chứa ít nhất 6 ký tự'});
      return false;
    }
    this.setState({register_password_isInvalid: false});
    this.setState({register_password_invalidMessage: ''});
    return true;
  }

  checkConfirmPassword(val, password) {
    if (val != password) {
      this.setState({register_confirmPassword_isInvalid: true});
      this.setState({register_confirmPassword_invalidMessage: 'Nhập lại mật khẩu không chính xác'});
      return false;
    }

    this.setState({register_confirmPassword_isInvalid: false});
    this.setState({register_confirmPassword_invalidMessage: ''});
    return true;
  }

  checkLastName(val) {
    if (!Validation.validateNull(val)) {
      this.setState({register_lastName_isInvalid: true});
      this.setState({register_lastName_invalidMessage: 'Bắt buộc'});
      return false;
    }

    this.setState({register_lastName_isInvalid: false});
    this.setState({register_lastName_invalidMessage: ''});
    return true;
  }

  checkFirstName(val) {

    if (!Validation.validateNull(val)) {
      this.setState({register_firstName_isInvalid: true});
      this.setState({register_firstName_invalidMessage: 'Bắt buộc'});
      return false;
    }

    this.setState({register_firstName_isInvalid: false});
    this.setState({register_firstName_invalidMessage: ''});
    return true;
  }
}