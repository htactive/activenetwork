import React, { Component } from 'react';
export class RecoverPassword extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="container page-content ">
          <div className="row">
            <div className="col-md-6  col-sm-8 col-xs-12 col-md-offset-3"><div className="col-md-22"><div className="row"><div className="row">
              <div className="row">
                <div className="col-md-6  col-sm-8 col-xs-12 col-md-offset-3">
                  <div className="panel panel-primary" id="locked-screen">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        Please enter your email address
                    </h3>
                    </div>
                    <div className="panel-body">
                      <form className="form-horizontal" role="form">
                        <div className="profile-pic text-center">
                          <img src="/assets/css/guy-3.jpg" alt="" className="img-circle img-responsive img-user" />
                        </div>
                        <div className="form-group">
                          <div className="col-md-12">
                            <input type="email" className="form-control" id="email" placeholder="Email" />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-12">
                            <a href="http://demos.bootdey.com/dayday/index.html" className="btn btn-info btn-block">
                              <i className="fa fa-share"></i>
                              Continue
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
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
}