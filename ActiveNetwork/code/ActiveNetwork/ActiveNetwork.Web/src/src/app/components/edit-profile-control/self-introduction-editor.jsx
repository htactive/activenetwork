import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../../services/user-profile-service';

export class SelfIntroductionEditor extends Component {
  componentWillMount() {
    this.setState({
      text: '',
      isEditing: false
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
      edit_text: props.text
    });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className="about">
          <div className="header-row">
            <span><i className="fa fa-square"/> VỀ BẢN THÂN</span>
            <div className="data-action">
              <a className="btn btn-link" onClick={() => this.saveEdit()}> Lưu thay đổi</a>
              <a className="btn btn-link" onClick={() => this.cancelEdit()}> Hủy</a>
            </div>
          </div>
          <div className="introduce-area">
            <textarea className="form-control" defaultValue={this.state.edit_text}
                      onChange={v => {
                        let val = v.target.value;
                        this.setState({edit_text: val});
                      }}/>
          </div>
        </div>);
    }
    return (
      <div className="about">
        <p className="header-row">
          <span><i className="fa fa-square"/> VỀ BẢN THÂN</span>
          <span className="data-action">
            <a className="btn btn-link" onClick={() => this.editClick()}><i className="fa fa-edit"/> Chỉnh sửa</a>
          </span>
        </p>
        <p dangerouslySetInnerHTML={{__html: this.state.text.replace(/(?:\r\n|\r|\n)/g, '<br />')}}/>
      </div>);
  }

  editClick() {
    this.setState({isEditing: true});
  }

  cancelEdit() {
    this.setState({isEditing: false});
  }

  async saveEdit() {
    let obj = {
      introduction: this.state.edit_text
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