import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../../services/user-profile-service';
import {Validation} from '../../../commons/validate-helper';

export class AddressEditor extends Component {
  componentWillMount() {
    this.setState({
      isEditing: false,
      address: '',
      edit_addressInvalid: false,
      edit_addressInvalidMessage: ''
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      address: props.address,
      edit_address: props.address,
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3 col-sm-12 col-xs-12">Địa chỉ</span>
          <div className="form-horizontal col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <div
              className={`form-group no-margin col-lg-12 col-md-12${this.state.edit_addressInvalid ? ' has-error' : ''}`}>
              <input type="text" className="form-control" placeholder="Địa chỉ"
                     defaultValue={this.state.edit_address}
                     onChange={(e) => {
                       let val = e.target.value;
                       this.setState({edit_address: val});
                       this.validateAddress(val);
                     }}
              />
              {this.state.edit_addressInvalid ?
                <span className="help-block">{this.state.edit_addressInvalidMessage}</span> : null}
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
          <span className="data-name col-lg-3 col-md-3 col-sm-12 col-xs-12">Địa chỉ</span>
          <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <a href={`mailto:${this.state.address}`} className="data-value">{this.state.address}</a>
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
      edit_address: this.state.address,
      edit_addressInvalid: false,
      edit_addressInvalidMessage: ''
    });
  }

  validateAddress(val) {
    return true;
  }

  async saveEdit() {
    if (!this.validateAddress(this.state.edit_address)) return;
    let obj = {
      address: this.state.edit_address,
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