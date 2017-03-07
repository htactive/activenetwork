import React, {Component} from 'react';

export class Error500Page extends Component {
  render() {
    return (<div>

      <div className="error-header"> </div>
      <div className="container ">
        <section className="error-container text-center">
          <h1 className="animated fadeInDown">500</h1>
          <div className="error-divider animated fadeInUp">
            <h2>ooops!!</h2>
            <p className="description">SOMETHING WENT WRONG.</p>
          </div>
          <a href="/" className="return-btn"><i className="fa fa-home"></i>Home</a>
        </section>
      </div>
      
    </div>);
  }
}