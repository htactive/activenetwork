import React, {Component} from 'react';
import {UserServiceInstance} from './services/user-service';
export class Login extends Component {
  componentWillMount() {
    this.setState({
      email: '',
      password: '',
      hasError: false
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
                      <span className="icon-text">Sign Up</span>
                    </h4>
                    <p className="text-muted">Create a new account</p>
                    <form action="index.html" method="get">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Full Name"/>
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email"/>
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password"/>
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Confirm Password"/>
                      </div>
                      <button type="submit" className="btn btn-azure">Register</button>
                    </form>
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
}