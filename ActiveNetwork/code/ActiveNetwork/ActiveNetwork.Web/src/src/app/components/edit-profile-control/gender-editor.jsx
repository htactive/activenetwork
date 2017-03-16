import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../../services/user-profile-service';
import {CommonServiceInstance} from '../../services/common-service';

export class GenderEditor extends Component {
  componentWillMount() {
    this.setState({
      isEditing: false,
      genderId: 0,
      edit_genderIdInvalid: false,
      edit_genderIdInvalidMessage: '',
      genderList:[]
    });
  }

  async componentDidMount() {
    this.setState({genderList: await CommonServiceInstance.getAllGenders()});
  }

  componentWillReceiveProps(props) {
    this.setState({
      genderId: props.genderId,
      edit_genderId: props.genderId,
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="row data-row">
          <span className="data-name col-lg-3 col-md-3">Giới tính</span>
          <div className="form-horizontal col-lg-9 col-md-9">
            <div
              className={`form-group no-margin col-lg-12 col-md-12${this.state.edit_genderIdInvalid ? ' has-error' : ''}`}>

              <select className="form-control"
                      value={this.state.edit_genderId}
                      onChange={(e) => {
                        let val = parseInt(e.target.value);
                        this.setState({edit_genderId: val});
                        this.validateGender(val);
                      }}
              >
                {this.state.genderList != null ? this.state.genderList.map(x => <option key={x.Id} value={x.Id}>
                  {x.GenderName}</option>) : null}
              </select>

              {/*<input type="text" className="form-control" placeholder="Thư điện tử"*/}
                     {/*defaultValue={this.state.edit_genderId}*/}
                     {/*onChange={(e) => {*/}
                       {/*let val = e.target.value;*/}
                       {/*this.setState({edit_genderId: val});*/}
                       {/*this.validateGender(val);*/}
                     {/*}}*/}
              {/*/>*/}
              {this.state.edit_genderIdInvalid ?
                <span className="help-block">{this.state.edit_genderIdInvalidMessage}</span> : null}
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
          <span className="data-name col-lg-3 col-md-3">Giới tính</span>
          <div className="col-lg-9 col-md-9">
            <span className="data-value">{(this.state.genderList.filter(x=>x.Id == this.state.genderId)[0] || {}).GenderName}</span>
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
      edit_genderId: this.state.genderId,
      edit_genderIdInvalid: false,
      edit_genderIdInvalidMessage: ''
    });
  }

  validateGender(val) {
    return true;
  }

  async saveEdit() {
    if (!this.validateGender(this.state.edit_genderId)) return;
    let obj = {
      genderId: this.state.edit_genderId
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