import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../services/user-profile-service'
import {FullNameEditor} from '../components/edit-profile-control/full-name-editor';
import {BirthdayEditor} from '../components/edit-profile-control/birth-date-editor';
import {UsernameEditor} from '../components/edit-profile-control/username-editor';
import {EmailAdressEditor} from '../components/edit-profile-control/email-address-editor';
import {PhoneNumberEditor} from '../components/edit-profile-control/phone-number-editor';
import {AddressEditor} from '../components/edit-profile-control/address-editor';
import {GenderEditor} from '../components/edit-profile-control/gender-editor';
import {SelfIntroductionEditor} from '../components/edit-profile-control/self-introduction-editor';
import {ChangePassword} from '../components/edit-profile-control/change-password';
import {userStore} from '../store/user-store';

export class EditProfilePage extends Component {
  componentWillMount() {
    this.setState({userProfile: {Gender: {}}});
  }

  async componentDidMount() {
    let profile = await this.getData();
    let birthDate = new Date(profile.BirthDate);
    if (!profile.BirthDate) {
      birthDate = null;
    }

    let currentUser = userStore.getState().currentUser || {};
    this.setState({
      userProfile: profile,
      user_birthDate: birthDate,
      user_username: currentUser.Username,
    });
  }

  async getData() {
    return await UserProfileServiceInstance.getMyProfile();
  }

  render() {
    return <div>
      <div className="container page-content edit-profile">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ul className="nav nav-tabs nav-tabs-custom-colored tabs-iconized">
              <li className="active"><a href="#profile-tab" data-toggle="tab" aria-expanded="true"><i
                className="fa fa-user"/> Hồ sơ cá nhân</a></li>
              <li className=""><a href="#settings-tab" data-toggle="tab" aria-expanded="false"><i
                className="fa fa-gear"/> Thiết đặt</a></li>
              <li className=""><a href="#activity-tab" data-toggle="tab" aria-expanded="false"><i
                className="fa fa-rss"/> Thông báo</a></li>
            </ul>
            <div className="tab-content profile-page">
              <div className="tab-pane profile active" id="profile-tab">
                <div className="row">
                  <div className="col-md-3">
                    <div className="user-info-left">
                      <img src={(this.state.userProfile.Avatar || {Url: ''}).Url} alt="Profile Picture"/>
                      <div className="contact">
                        <p>
                          <a className="file-input btn btn-link btn-file">
                            Đổi hình đại diện <input type="file" multiple="" accept="image/*"
                                                     onChange={v => this.startUploadMyAvatar(v)}/>
                          </a>
                        </p>
                        <ul className="list-inline social">
                          <li><a href="#" title="Facebook"><i className="fa fa-facebook-square"/></a></li>
                          <li><a href="#" title="Twitter"><i className="fa fa-twitter-square"/></a></li>
                          <li><a href="#" title="Google Plus"><i className="fa fa-google-plus-square"/></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="user-info-right">
                      <div className="basic-info">
                        <p className="header-row"><i className="fa fa-square"/> THÔNG TIN CƠ BẢN</p>
                        <UsernameEditor username={this.state.user_username}/>
                        <FullNameEditor
                          firstName={this.state.userProfile.FirstName}
                          middleName={this.state.userProfile.MiddleName}
                          lastName={this.state.userProfile.LastName}
                          afterSaveChanged={(model) => {
                            this.state.userProfile.FirstName = model.firstName;
                            this.state.userProfile.LastName = model.lastName;
                            this.state.userProfile.MiddleName = model.middleName;
                            this.forceUpdate();
                          }}
                        />
                        <BirthdayEditor
                          birthDate={this.state.user_birthDate}
                          afterSaveChanged={(model) => {
                            this.setState({user_birthDate: model.birthDate});
                          }}
                        />
                        <GenderEditor
                          genderId={this.state.userProfile.Gender.Id}
                          afterSaveChanged={(model) => {
                            this.state.userProfile.Gender.Id = model.genderId;

                            this.forceUpdate();
                          }}
                        />
                      </div>
                      <div className="contact_info">
                        <p className="header-row"><i className="fa fa-square"/> THÔNG TIN LIÊN LẠC</p>
                        <EmailAdressEditor
                          email={this.state.userProfile.Email}
                          afterSaveChanged={(model) => {
                            this.state.userProfile.Email = model.email;
                            this.forceUpdate();
                          }}
                        />
                        <PhoneNumberEditor
                          phone={this.state.userProfile.Phone}
                          afterSaveChanged={(model) => {
                            this.state.userProfile.Phone = model.phone;
                            this.forceUpdate();
                          }}
                        />
                        <AddressEditor

                          address={this.state.userProfile.Address}
                          afterSaveChanged={(model) => {
                            this.state.userProfile.Address = model.address;
                            this.forceUpdate();
                          }}
                        />
                      </div>
                      <SelfIntroductionEditor
                        text={this.state.userProfile.Introduction}
                        afterSaveChanged={(model) => {
                          this.state.userProfile.Introduction = model.introduction;
                          this.forceUpdate();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane settings" id="settings-tab">
                <ChangePassword/>
              </div>

              <div className="tab-pane activity" id="activity-tab">
                <ul className="list-unstyled activity-list">
                  <li>
                    <i className="fa fa-times activity-icon pull-left"/>
                    <p>
                      <a href="#">Jonathan</a> commented on <a href="#">Special Deal 2013</a> <span
                      className="timestamp">12 minutes ago</span>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-times activity-icon pull-left"/>
                    <p>
                      <a href="#">Jonathan</a> posted <a href="#">a new blog post</a> <span className="timestamp">4 hours ago</span>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-times activity-icon pull-left"/>
                    <p>
                      <a href="#">Jonathan</a> edited his profile <span className="timestamp">11 hours ago</span>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-times activity-icon pull-left"/>
                    <p>
                      <a href="#">Jonathan</a> has added review on <a href="#">jQuery Complete Guide</a> book <span
                      className="timestamp">Yesterday</span>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-times activity-icon pull-left"/>
                    <p>
                      <a href="#">Jonathan</a> liked <a href="#">a post</a> <span
                      className="timestamp">December 12</span>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-times activity-icon pull-left"/>
                    <p>
                      <a href="#">Jonathan</a> has completed one task <span className="timestamp">December 11</span>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-times activity-icon pull-left"/>
                    <p>
                      <a href="#">Jonathan</a> uploaded <a href="#">new photos</a> <span className="timestamp">December 5</span>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-times activity-icon pull-left"/>
                    <p>
                      <a href="#">Jonathan</a> has updated his credit card info <span
                      className="timestamp">September 28</span>
                    </p>
                  </li>
                </ul>
                <p className="text-center more"><a href="#" className="btn btn-custom-primary">View more <i
                  className="fa fa-long-arrow-right"/></a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  async startUploadMyAvatar(v) {
    if (v.target.files && v.target.files[0]) {

      let image = v.target.files[0];
      console.log(image);
      debugger;
      let uploadResult = await UserProfileServiceInstance.uploadUserAvatar({avatar: image});
      if(uploadResult){
        this.state.userProfile.Avatar = uploadResult;
        this.forceUpdate();
      }
    }
  }
}