import React, {Component} from 'react';
import {UserProfileServiceInstance} from '../services/user-profile-service'
import {FullNameEditor} from '../components/edit-profile-control/full-name-editor';

export class EditProfilePage extends Component {
  componentWillMount() {
    this.setState({userProfile: {}});
  }

  async componentDidMount() {
    this.setState({userProfile: await this.getData()});
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
                className="fa fa-user"/> Profile</a></li>
              <li className=""><a href="#activity-tab" data-toggle="tab" aria-expanded="false"><i
                className="fa fa-rss"/> Recent Activity</a></li>
              <li className=""><a href="#settings-tab" data-toggle="tab" aria-expanded="false"><i
                className="fa fa-gear"/> Settings</a></li>
            </ul>
            <div className="tab-content profile-page">
              <div className="tab-pane profile active" id="profile-tab">
                <div className="row">
                  <div className="col-md-3">
                    <div className="user-info-left">
                      <img src="/img/Friends/guy-3.jpg" alt="Profile Picture"/>
                      <h2>{this.state.userProfile.FirstName}</h2>
                      <div className="contact">
                        <p>
                        <span className="file-input btn btn-azure btn-file">
                          Change Avatar <input type="file" multiple=""/>
                        </span>
                        </p>
                        <p>
                        <span className="file-input btn btn-azure btn-file">
                          Change Cover <input type="file" multiple=""/>
                        </span>
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
                        <p className="data-row">
                          <span className="data-name">Định danh</span>
                          <span className="data-value">{this.state.userProfile.FirstName}</span>
                        </p>
                        <FullNameEditor
                          firstName={this.state.userProfile.FirstName}
                          middleName={this.state.userProfile.MiddleName}
                          lastName={this.state.userProfile.LastName}
                        />
                        <p className="data-row">
                          <span className="data-name">Birth Date</span>
                          <span className="data-value">{this.state.userProfile.BirthDate}</span>
                        </p>
                        <p className="data-row">
                          <span className="data-name">Gender</span>
                          <span className="data-value">{this.state.userProfile.Gender}</span>
                        </p>
                        <p className="data-row">
                          <span className="data-name">Website</span>
                          <span className="data-value"><a href="#">www.jonasmith.com</a></span>
                        </p>
                        <p className="data-row">
                          <span className="data-name">Last Login</span>
                          <span className="data-value">2 hours ago</span>
                        </p>
                        <p className="data-row">
                          <span className="data-name">Date Joined</span>
                          <span className="data-value">Feb 22, 2012</span>
                        </p>
                      </div>
                      <div className="contact_info">
                        <p className="header-row"><i className="fa fa-square"/> THÔNG TIN LIÊN LẠC</p>
                        <p className="data-row">
                          <span className="data-name">Email</span>
                          <span className="data-value">{this.state.userProfile.Email}</span>
                        </p>
                        <p className="data-row">
                          <span className="data-name">Phone</span>
                          <span className="data-value">{this.state.userProfile.Phone}</span>
                        </p>
                        <p className="data-row">
                          <span className="data-name">Address</span>
                          <span className="data-value">{this.state.userProfile.Address}</span>
                        </p>
                      </div>
                      <div className="about">
                        <p className="header-row"><i className="fa fa-square"/> VỀ BẢN THÂN</p>
                        <p>Dramatically facilitate proactive solutions whereas professional intellectual capital.
                          Holisticly utilize competitive e-markets through intermandated meta-services. Objectively.</p>
                        <p>Monotonectally foster future-proof infomediaries before principle-centered interfaces.
                          Assertively recaptiualize cutting-edge web services rather than emerging "outside the box"
                          thinking. Phosfluorescently cultivate resource maximizing technologies and user-centric
                          convergence. Completely underwhelm cross functional innovation vis-a-vis.</p>
                      </div>
                    </div>
                  </div>
                </div>
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

              <div className="tab-pane settings" id="settings-tab">
                <form className="form-horizontal" role="form">
                  <fieldset>
                    <h3><i className="fa fa-square"/> Change Password</h3>
                    <div className="form-group">
                      <label htmlFor="old-password" className="col-sm-3 control-label">Old Password</label>
                      <div className="col-sm-4">
                        <input type="password" id="old-password" name="old-password" className="form-control"/>
                      </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                      <label htmlFor="password" className="col-sm-3 control-label">New Password</label>
                      <div className="col-sm-4">
                        <input type="password" id="password" name="password" className="form-control"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password2" className="col-sm-3 control-label">Repeat Password</label>
                      <div className="col-sm-4">
                        <input type="password" id="password2" name="password2" className="form-control"/>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <h3><i className="fa fa-square"/> Privacy</h3>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="colored-blue" defaultChecked="checked"/>
                        <span className="text">Show my display name</span>
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="colored-blue" defaultChecked="checked"/>
                        <span className="text">Show my birth date</span>
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="colored-blue" defaultChecked="checked"/>
                        <span className="text">Show my email</span>
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="colored-blue" defaultChecked="checked"/>
                        <span className="text">Show my online status on chat</span>
                      </label>
                    </div>
                  </fieldset>
                  <h3><i className="fa fa-square"> </i>Notifications</h3>
                  <fieldset>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="colored-blue" defaultChecked="checked"/>
                        <span className="text">Receive message from administrator</span>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="colored-blue" defaultChecked="checked"/>
                        <span className="text">New product has been added</span>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="colored-blue" defaultChecked="checked"/>
                        <span className="text">Product review has been approved</span>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" className="colored-blue" defaultChecked="checked"/>
                        <span className="text">Others liked your post</span>
                      </label>
                    </div>
                  </fieldset>
                </form>
                <p className="text-center"><a href="#" className="btn btn-custom-primary"><i
                  className="fa fa-floppy-o"/> Save Changes</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}