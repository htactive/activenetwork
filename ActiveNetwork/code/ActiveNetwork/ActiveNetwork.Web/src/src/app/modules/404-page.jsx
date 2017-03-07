import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {virtualPath} from '../commons/constant'

export class Error404Page extends Component {
  render() {
    return (<div>

      <div className="error-header"> </div>
      <div className="container ">
        <section className="error-container text-center">
          <h1 className="animated fadeInDown">404</h1>
          <div className="error-divider animated fadeInUp">
            <h2>PAGE NOT FOUND.</h2>
            <p className="description">We Couldn't Find This Page</p>
          </div>
          <a href="profile.html" className="return-btn"><i className="fa fa-home"></i>Home</a>
        </section>
      </div>
      
    </div>);
  }
}