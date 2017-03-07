import React, {Component} from 'react';
import {virtualPath} from '../commons/constant'
import {browserHistory} from 'react-router';
import {CreateEventDialog} from '../components/create-event-dialog'

export class Header extends Component {
  createEventDialog;

  createNewEvent() {
    this.createEventDialog && this.createEventDialog.show();
  }

  render() {
    return <div>
      <nav className="navbar navbar-dark navbar-fixed-top">
        <div className="container">
          <div className="navbar-header custom-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <div>
            </div>
            <a className="navbar-brand an-logo" href="#" onClick={(e)=>{
              e.preventDefault();
              browserHistory.push(`${virtualPath}`)
            }}>
              <span>network</span>
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <div className="form-group nav-search-bar">
                  <input type="text" className="form-control" placeholder="Tìm kiếm sự kiện, bạn bè và mọi thứ..." />
                  <span className="fa-icon fa fa-search" aria-hidden="true"/>
                </div>
              </li>
              <li className="dropdown avatar-img">
                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <img src="/img/avatar.jpg" className="img-rounded img-responsive" alt="John Cena"/>
                  <span>John Cena</span>
                  <span className="caret"/>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Trang Cá Nhân</a></li>
                  <li><a href="#">Quản Lý Sự Kiện</a></li>
                  <li><a href="#">Cài Đặt</a></li>
                  <li className="divider"></li>
                  <li><a href="#">Đăng Xuất</a></li>
                </ul>
              </li>
              <li>
                <a href="#" onClick={() => this.createNewEvent()}><i className="fa fa-plus-circle" />&nbsp;Tạo sự kiện</a>
              </li>
              <li><a href="#">Trang Chủ</a></li>
              <li className="dropdown">
                <a href="http://demos.bootdey.com/dayday/grid_posts.html#" className="dropdown-toggle"
                   data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Pages <span className="caret"/>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="http://demos.bootdey.com/dayday/profile2.html">Profile 2</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/profile3.html">Profile 3</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/profile4.html">Profile 4</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/sidebar_profile.html">Sidebar profile</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/user_detail.html">User detail</a></li>
                  <li><a href="" onClick={(e) => {
                    e.preventDefault();
                    browserHistory.push(`${virtualPath}/profile-page`)
                  }}>Edit profile</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/about.html">About</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/friends.html">Friends</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/friends2.html">Friends 2</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/profile_wall.html">Profile wall</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/photos1.html">Photos 1</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/photos2.html">Photos 2</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/view_photo.html">View photo</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/messages1.html">Messages 1</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/messages2.html">Messages 2</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/group.html">Group</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/list_users.html">List users</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/file_manager.html">File manager</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/people_directory.html">People directory</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/list_posts.html">List posts</a></li>
                  <li><a href="" onClick={(e) => {
                    e.preventDefault();
                    browserHistory.push(`${virtualPath}/post-grid`)
                  }}>Grid posts</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/forms.html">Forms</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/buttons.html">Buttons</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/error404.html">Error 404</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/error500.html">Error 500</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/recover_password.html">Recover password</a></li>
                  <li><a href="http://demos.bootdey.com/dayday/registration_mail.html">Registration mail</a></li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <CreateEventDialog ref={(r) => this.createEventDialog = r}/>
    </div>;
  }
}