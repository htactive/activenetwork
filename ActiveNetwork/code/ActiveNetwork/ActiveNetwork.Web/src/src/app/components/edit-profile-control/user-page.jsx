import React, {Component} from 'react';
import {UserServiceInstance} from '../../services/user-service';

export class UserPage extends Component {
  componentWillMount() {

  }

  render(){
    return (
    <div>
      <div className="container page-content">
        <div className="row" id="user-profile2">
          <div className="col-md-4 col-xs-12">
            <div className="row-xs">
              <div className="main-box clearfix">
                <h2>John Breakgrow jr.</h2>
                <div className="profile-status">
                  <i className="fa fa-check-circle"></i> Online
                </div>
                <img src="img/Friends/guy-3.jpg" alt="" className="profile-img img-responsive center-block show-in-modal"/>

                  <div className="profile-details">
                    <ul className="fa-ul">
                      <li><i className="fa-li fa fa-user"></i>Following: <span>456</span></li>
                      <li><i className="fa-li fa fa-users"></i>Followers: <span>828</span></li>
                      <li><i className="fa-li fa fa-comments"></i>Posts: <span>1024</span></li>
                    </ul>
                  </div>

                  <div className="profile-message-btn center-block text-center">
                    <a href="#" className="btn btn-azure">
                      <i className="fa fa-envelope"></i>
                      Send message
                    </a>
                  </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 col-xs-12">
            <div className="row-xs">
              <div className="main-box clearfix">
                <div className="row profile-user-info">
                  <div className="col-sm-8">
                    <div className="profile-user-details clearfix">
                      <div className="profile-user-details-label">
                        First Name
                      </div>
                      <div className="profile-user-details-value">
                        John
                      </div>
                    </div>
                    <div className="profile-user-details clearfix">
                      <div className="profile-user-details-label">
                        Last Name
                      </div>
                      <div className="profile-user-details-value">
                        Breakgrow
                      </div>
                    </div>
                    <div className="profile-user-details clearfix">
                      <div className="profile-user-details-label">
                        Address
                      </div>
                      <div className="profile-user-details-value">
                        10880 Malibu Point,<br/>
                        Malibu, Calif., 90265
                      </div>
                    </div>
                    <div className="profile-user-details clearfix">
                      <div className="profile-user-details-label">
                        Email
                      </div>
                      <div className="profile-user-details-value">
                        BreakgrowJohn@myemail.com
                      </div>
                    </div>
                    <div className="profile-user-details clearfix">
                      <div className="profile-user-details-label">
                        Phone number
                      </div>
                      <div className="profile-user-details-value">
                        011 223 344 556 677
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 profile-social">
                    <ul className="fa-ul">
                      <li><i className="fa-li fa fa-twitter-square"></i><a href="#">@johnbrewk</a></li>
                      <li><i className="fa-li fa fa-linkedin-square"></i><a href="#">John Breakgrow jr.</a></li>
                      <li><i className="fa-li fa fa-facebook-square"></i><a href="#">John Breakgrow jr.</a></li>
                      <li><i className="fa-li fa fa-skype"></i><a href="#">john_smart</a></li>
                      <li><i className="fa-li fa fa-instagram"></i><a href="#">john_smart</a></li>
                    </ul>
                  </div>
                </div>

                <div className="tabs-wrapper profile-tabs">
                  <ul className="nav nav-tabs">
                    <li className="active"><a href="#tab-timeline" data-toggle="tab">Timeline</a></li>
                    <li><a href="#tab-following" data-toggle="tab">Following</a></li>
                    <li><a href="#tab-followers" data-toggle="tab">Followers</a></li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane fade in active" id="tab-timeline">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="box box-widget">
                            <div className="box-header with-border">
                              <div className="user-block">
                                <img className="img-circle" src="img/Friends/guy-3.jpg" alt="User Image"/>
                                  <span className="username"><a href="#">John Breakgrow jr.</a></span>
                                  <span className="description">Shared publicly - 7:30 PM Today</span>
                              </div>
                            </div>

                            <div className="box-body" >
                              <img className="img-responsive show-in-modal" src="img/Post/young-couple-in-love.jpg" alt="Photo"/>
                                <p>I took this photo this morning. What do you guys think?</p>
                                <button type="button" className="btn btn-default btn-xs"><i className="fa fa-share"></i> Share</button>
                                <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-up"></i> Like</button>
                                <span className="pull-right text-muted">127 likes - 3 comments</span>
                            </div>
                            <div className="box-footer box-comments" >
                              <div className="box-comment">
                                <img className="img-circle img-sm" src="img/Friends/guy-2.jpg" alt="User Image"/>
                                  <div className="comment-text">
                                <span className="username">
                                Maria Gonzales
                                <span className="text-muted pull-right">8:03 PM Today</span>
                                </span>
                                    It is a long established fact that a reader will be distracted
                                    by the readable content of a page when looking at its layout.
                                  </div>
                              </div>

                              <div className="box-comment">
                                <img className="img-circle img-sm" src="img/Friends/guy-3.jpg" alt="User Image"/>
                                  <div className="comment-text">
                                <span className="username">
                                Luna Stark
                                <span className="text-muted pull-right">8:03 PM Today</span>
                                </span>
                                    It is a long established fact that a reader will be distracted
                                    by the readable content of a page when looking at its layout.
                                  </div>
                              </div>
                            </div>
                            <div className="box-footer" >
                              <form action="#" method="post">
                                <img className="img-responsive img-circle img-sm" src="img/Friends/guy-3.jpg" alt="Alt Text"/>
                                  <div className="img-push">
                                    <input type="text" className="form-control input-sm" placeholder="Press enter to post comment"/>
                                  </div>
                              </form>
                            </div>
                          </div>
                          <div className="box box-widget">
                            <div className="box-header with-border">
                              <div className="user-block">
                                <img className="img-circle" src="img/Friends/guy-3.jpg" alt="User Image"/>
                                  <span className="username"><a href="#">Jonathan Burke Jr.</a></span>
                                  <span className="description">Shared publicly - 7:30 PM Today</span>
                              </div>
                            </div>
                            <div className="box-body">
                              <p>Far far away, behind the word mountains, far from the
                                countries Vokalia and Consonantia, there live the blind
                                texts. Separated they live in Bookmarksgrove right at</p>

                              <p>the coast of the Semantics, a large language ocean.
                                A small river named Duden flows by their place and supplies
                                it with the necessary regelialia. It is a paradisematic
                                country, in which roasted parts of sentences fly into
                                your mouth.</p>

                              <div className="attachment-block clearfix">
                                <img className="attachment-img show-in-modal" src="img/Photos/2.jpg" alt="Attachment Image"/>
                                  <div className="attachment-pushed">
                                    <h4 className="attachment-heading"><a href="http://www.bootdey.com/">Lorem ipsum text generator</a></h4>
                                    <div className="attachment-text">
                                      Description about the attachment can be placed here.
                                      Lorem Ipsum is simply dummy text of the printing and typesetting industry... <a href="#">more</a>
                                    </div>
                                  </div>
                              </div>
                              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-share"></i> Share</button>
                              <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-up"></i> Like</button>
                              <span className="pull-right text-muted">45 likes - 2 comments</span>
                            </div>
                            <div className="box-footer box-comments">
                              <div className="box-comment">
                                <img className="img-circle img-sm" src="img/Friends/guy-5.jpg" alt="User Image"/>
                                  <div className="comment-text">
                                <span className="username">
                                Maria Gonzales
                                <span className="text-muted pull-right">8:03 PM Today</span>
                                </span>
                                    It is a long established fact that a reader will be distracted
                                    by the readable content of a page when looking at its layout.
                                  </div>
                              </div>
                              <div className="box-comment">
                                <img className="img-circle img-sm" src="img/Friends/guy-6.jpg" alt="User Image"/>
                                  <div className="comment-text">
                                <span className="username">
                                Nora Havisham
                                <span className="text-muted pull-right">8:03 PM Today</span>
                                </span>
                                    The point of using Lorem Ipsum is that it has a more-or-less
                                    normal distribution of letters, as opposed to using
                                    'Content here, content here', making it look like readable English.
                                  </div>
                              </div>
                            </div>
                            <div className="box-footer">
                              <form action="#" method="post">
                                <img className="img-responsive img-circle img-sm" src="img/Friends/guy-3.jpg" alt="Alt Text"/>
                                  <div className="img-push">
                                    <input type="text" className="form-control input-sm" placeholder="Press enter to post comment"/>
                                  </div>
                              </form>
                            </div>
                          </div>
                          <div className="box box-widget">
                            <div className="box-header with-border">
                              <div className="user-block">
                                <img className="img-circle" src="img/Friends/guy-3.jpg" alt="User Image"/>
                                  <span className="username"><a href="#">John Breakgrow jr.</a></span>
                                  <span className="description">Shared publicly - 7:30 PM Today</span>
                              </div>
                            </div>

                            <div className="box-body" >
                              <img className="img-responsive pad show-in-modal" src="img/Photos/3.jpg" alt="Photo"/>
                                <p>I took this photo this morning. What do you guys think?</p>
                                <button type="button" className="btn btn-default btn-xs"><i className="fa fa-share"></i> Share</button>
                                <button type="button" className="btn btn-default btn-xs"><i className="fa fa-thumbs-o-up"></i> Like</button>
                                <span className="pull-right text-muted">127 likes - 3 comments</span>
                            </div>
                            <div className="box-footer box-comments" >
                              <div className="box-comment">
                                <img className="img-circle img-sm" src="img/Friends/guy-2.jpg" alt="User Image"/>
                                  <div className="comment-text">
                                <span className="username">
                                Maria Gonzales
                                <span className="text-muted pull-right">8:03 PM Today</span>
                                </span>
                                    It is a long established fact that a reader will be distracted
                                    by the readable content of a page when looking at its layout.
                                  </div>
                              </div>

                              <div className="box-comment">
                                <img className="img-circle img-sm" src="img/Friends/guy-3.jpg" alt="User Image"/>
                                  <div className="comment-text">
                                <span className="username">
                                Luna Stark
                                <span className="text-muted pull-right">8:03 PM Today</span>
                                </span>
                                    It is a long established fact that a reader will be distracted
                                    by the readable content of a page when looking at its layout.
                                  </div>
                              </div>
                            </div>
                            <div className="box-footer" >
                              <form action="#" method="post">
                                <img className="img-responsive img-circle img-sm" src="img/Friends/guy-3.jpg" alt="Alt Text"/>
                                  <div className="img-push">
                                    <input type="text" className="form-control input-sm" placeholder="Press enter to post comment"/>
                                  </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="tab-following">
                      <ul className="widget-users row">
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/woman-3.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Mileth zanders</a>
                            </div>
                            <div className="time">
                              <i className="fa fa-clock-o"></i> Last online: 5 minutes ago
                            </div>
                            <div className="type">
                              <span className="label label-danger">Admin</span>
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/woman-3.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Mila Kendrichk</a>
                            </div>
                            <div className="time online">
                              <i className="fa fa-check-circle"></i> Online
                            </div>
                            <div className="type">
                              <span className="label label-warning">Pending</span>
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/guy-1.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Arnold Thossling</a>
                            </div>
                            <div className="time online">
                              <i className="fa fa-check-circle"></i> Online
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/guy-2.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Peter Downey</a>
                            </div>
                            <div className="time">
                              <i className="fa fa-clock-o"></i> Last online: Thursday
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/woman-3.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Emiliath Suansont</a>
                            </div>
                            <div className="time">
                              <i className="fa fa-clock-o"></i> Last online: 1 week ago
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/guy-6.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Briatng bowingy</a>
                            </div>
                            <div className="time">
                              <i className="fa fa-clock-o"></i> Last online: 1 month ago
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/woman-4.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Milanith Grotyu</a>
                            </div>
                            <div className="time online">
                              <i className="fa fa-check-circle"></i> Online
                            </div>
                            <div className="type">
                              <span className="label label-warning">Pending</span>
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/guy-5.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Trwort Htrew</a>
                            </div>
                            <div className="time online">
                              <i className="fa fa-check-circle"></i> Online
                            </div>
                          </div>
                        </li>
                      </ul>
                      <br/>
                        <a href="#" className="btn btn-azure pull-right">
                          <i className="fa fa-refresh"></i>
                          Load more
                        </a>
                    </div>

                    <div className="tab-pane fade" id="tab-followers">
                      <ul className="widget-users row">
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/woman-6.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Danielath grande</a>
                            </div>
                            <div className="time">
                              <i className="fa fa-clock-o"></i> Last online: 5 minutes ago
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/woman-4.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Fernanda Hytrod</a>
                            </div>
                            <div className="time online">
                              <i className="fa fa-check-circle"></i> Online
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/guy-1.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Arnold Thossling</a>
                            </div>
                            <div className="time online">
                              <i className="fa fa-check-circle"></i> Online
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/guy-2.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Peter Downey</a>
                            </div>
                            <div className="time">
                              <i className="fa fa-clock-o"></i> Last online: Thursday
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/woman-3.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Emiliath Suansont</a>
                            </div>
                            <div className="time">
                              <i className="fa fa-clock-o"></i> Last online: 1 week ago
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/guy-6.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Briatng bowingy</a>
                            </div>
                            <div className="time">
                              <i className="fa fa-clock-o"></i> Last online: 1 month ago
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/woman-4.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Milanith Grotyu</a>
                            </div>
                            <div className="time online">
                              <i className="fa fa-check-circle"></i> Online
                            </div>
                          </div>
                        </li>
                        <li className="col-md-6">
                          <div className="img">
                            <img src="img/Friends/guy-5.jpg" alt=""/>
                          </div>
                          <div className="details">
                            <div className="name">
                              <a href="#">Trwort Htrew</a>
                            </div>
                            <div className="time online">
                              <i className="fa fa-check-circle"></i> Online
                            </div>
                          </div>
                        </li>
                      </ul>
                      <br/>
                        <a href="#" className="btn btn-azure pull-right">
                          <i className="fa fa-refresh"></i>
                          Load more
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="modal fade" id="modalShow" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div className="modal-body text-centers">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  };
}