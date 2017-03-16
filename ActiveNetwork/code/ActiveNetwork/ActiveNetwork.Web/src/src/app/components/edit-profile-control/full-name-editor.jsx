import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../../services/user-profile-service';

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
      edit_firstName: props.firstName,
      lastName: props.lastName,
      edit_lastName: props.lastName,
      middleName: props.middleName,
      edit_middleName: props.middleName
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3">Họ và tên</span>
          <div className="form-horizontal col-lg-9 col-md-9">
            <div className="col-lg-4 col-md-4">
              <input type="text" className="form-control" placeholder="Họ"
                     defaultValue={this.state.edit_lastName}
                      onChange={(e)=>this.setState({edit_lastName:e.target.value})}
              />
            </div>
            <div className="col-lg-4 col-md-4">
              <input type="text" className="form-control" placeholder="Đệm"
                     defaultValue={this.state.edit_middleName}
                     onChange={(e)=>this.setState({edit_middleName:e.target.value})}/>
            </div>
            <div className="col-lg-4 col-md-4">
              <input type="text" className="form-control" placeholder="Tên"
                     defaultValue={this.state.edit_firstName}
                     onChange={(e)=>this.setState({edit_firstName:e.target.value})}/>
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
          <span className="data-name col-lg-3 col-md-3">Họ và tên</span>
          <div className="col-lg-9 col-md-9">
          <span
            className="data-value">{`${`${this.state.lastName} ${this.state.middleName}`.trim()} ${this.state.firstName}`.trim()}</span>
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
      isEditing: false
    });
  }

  async saveEdit() {
    let obj = {
      firstName: this.state.edit_firstName, lastName: this.state.edit_lastName, middleName: this.state.edit_middleName,
    };
    let saveResult = await UserProfileServiceInstance.updateMyProfile(obj);
    if (saveResult) {
      (this.props.afterSaveChanged||(e=>{}))(obj);
      this.setState({
        isEditing: false
      });
    }
  }
}