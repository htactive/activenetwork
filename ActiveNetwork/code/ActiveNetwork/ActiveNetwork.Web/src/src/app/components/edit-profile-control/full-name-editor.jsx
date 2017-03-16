import React, {Component} from 'react';

export class FullNameEditor extends Component {
  componentWillMount() {
    this.setState({
      isEditing: false,
      firstName: '',
      lastName: '',
      middleName: ''
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      firstName: props.firstName,
      lastName: props.lastName,
      middleName: props.middleName
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="row data-row">
          <div className="form-group col-lg-4 col-md-4">
            <input type="text" className="form-control" placeholder="Họ"
                   value=""/>
          </div>
          <div className="form-group col-lg-4 col-md-4">
            <input type="text" className="form-control" placeholder="Đệm"
                   value=""/>
          </div>
          <div className="form-group col-lg-4 col-md-4">
            <input type="text" className="form-control" placeholder="Tên"
                   value=""/>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row data-row">
          <span className="data-name">Họ và tên</span>
          <span
            className="data-value">{`${`${this.state.lastName} ${this.state.middleName}`.trim()} ${this.state.firstName}`.trim()}</span>
          <span className="data-action">
          <a className="btn btn-link" onClick={() => this.editClick()}><i className="fa fa-edit"/> Chỉnh sửa</a>
          </span>
        </div>
      </div>);
  }

  editClick() {
    this.setState({
      isEditing: true
    });
  }
}