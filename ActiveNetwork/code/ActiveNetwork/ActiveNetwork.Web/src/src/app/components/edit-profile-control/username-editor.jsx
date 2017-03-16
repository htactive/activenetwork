import React, {Component} from 'react';

export class UsernameEditor extends Component {
  componentWillMount() {
    this.setState({
      username: ''
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      username: props.username,
    });
  }

  render() {
    return (
      <div>
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3">Tên đăng nhập</span>
          <div className="col-lg-9 col-md-9">
          <span
            className="data-value">{this.state.username}</span>
          </div>
        </div>
      </div>);
  }

}