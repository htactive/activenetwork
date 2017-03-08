import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {virtualPath} from '../commons/constant'

export class EventManager extends Component {
  render() {
    return (<div>


      <div className="container page-content ">
        <div className="row">
          <div className="col-md-3">
            <div className="ibox float-e-margins">
              <div className="ibox-content">
                <div className="file-manager">
                  <div className="hr-line-dashed"></div>
                  <div className="hr-line-dashed"></div>
                  <h5>Danh sách sự kiện</h5>
                  <ul className="folder-list" style={{padding: 0}}>
                    <li><a href=""><i className="fa fa-align-right"></i> Sự kiện đã tạo abc mmmm</a></li>
                    <li><a href=""><i className="fa fa-align-right"></i> Sự kiện đã tham gia</a></li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 animated fadeInRight" style={{paddingLeft: 200}}>
            <div className="row">
              <div className="col-md-12">
                <div className="file-box">
                  <div className="file">
                    <a href="" onClick={(e) => {
                      e.preventDefault();
                      browserHistory.push(`${virtualPath}/event`)
                    }}>
                      <span className="corner"></span>

                      <div className="image">
                        <img alt="image" className="img-responsive" src="/img/Photos/3.jpg"/>
                      </div>
                      <div className="file-name">
                        Event 1
                        <br/>
                          <small>Added: Jan 6, 2014</small>
                      </div>
                    </a>

                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="image">
                        <img alt="image" className="img-responsive" src="/img/Photos/2.jpg"/>
                      </div>
                      <div className="file-name">
                        Event 2
                        <br/>
                          <small>Added: Jan 7, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="icon">
                        <i className="fa fa-film"></i>
                      </div>
                      <div className="file-name">
                        Event 3
                        <br/>
                          <small>Added: Jan 22, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="icon">
                        <i className="img-responsive fa fa-film"></i>
                      </div>
                      <div className="file-name">
                        Event 4
                        <br/>
                          <small>Added: Fab 18, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="image">
                        <img alt="image" className="img-responsive" src="/img/Photos/4.jpg"/>
                      </div>
                      <div className="file-name">
                        Event 5
                        <br/>
                          <small>Added: Jan 6, 2014</small>
                      </div>
                    </a>

                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="image">
                        <img alt="image" className="img-responsive" src="/img/Photos/5.jpg"/>
                      </div>
                      <div className="file-name">
                        Event 6
                        <br/>
                          <small>Added: Jan 7, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="icon">
                        <i className="fa fa-film"></i>
                      </div>
                      <div className="file-name">
                        Event 7
                        <br/>
                          <small>Added: Jan 22, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="icon">
                        <i className="img-responsive fa fa-film"></i>
                      </div>
                      <div className="file-name">
                        Event 8
                        <br/>
                          <small>Added: Fab 18, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="image">
                        <img alt="image" className="img-responsive" src="/img/Photos/6.jpg"/>
                      </div>
                      <div className="file-name">
                        Event 9
                        <br/>
                          <small>Added: Jan 6, 2014</small>
                      </div>
                    </a>

                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="image">
                        <img alt="image" className="img-responsive" src="/img/Photos/7.jpg"/>
                      </div>
                      <div className="file-name">
                        Event 10
                        <br/>
                          <small>Added: Jan 7, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="icon">
                        <i className="fa fa-film"></i>
                      </div>
                      <div className="file-name">
                        Event 11
                        <br/>
                          <small>Added: Jan 22, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="file-box">
                  <div className="file">
                    <a href="#">
                      <span className="corner"></span>

                      <div className="icon">
                        <i className="img-responsive fa fa-film"></i>
                      </div>
                      <div className="file-name">
                        Event 12
                        <br/>
                          <small>Added: Fab 18, 2014</small>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>);
  }
}