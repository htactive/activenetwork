import React, {Component} from 'react';

export class EventDetailWallOtherEventsComponent extends Component {

  render(){
    return(
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-caption">Sự kiện khác</h3>
        </div>
        <div className="widget-body bordered-top bordered-sky">
          <div className="card">
            <div className="content">
              <ul className="list-unstyled team-members">
                <li>
                  <div className="row">
                    <div className="col-xs-3">
                      <div className="avatar">
                        <img src="/img/Likes/likes-1.png" alt="Circle Image"
                             className="img-circle img-no-padding img-responsive"/>
                      </div>
                    </div>
                    <div className="col-xs-6">
                      Github
                    </div>

                    <div className="col-xs-3 text-right">
                      <btn className="btn btn-sm btn-azure btn-icon"><i className="fa fa-user"/></btn>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-xs-3">
                      <div className="avatar">
                        <img src="/img/Likes/likes-3.png" alt="Circle Image"
                             className="img-circle img-no-padding img-responsive"/>
                      </div>
                    </div>
                    <div className="col-xs-6">
                      Css snippets
                    </div>

                    <div className="col-xs-3 text-right">
                      <btn className="btn btn-sm btn-azure btn-icon"><i className="fa fa-user"/></btn>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-xs-3">
                      <div className="avatar">
                        <img src="/img/Likes/likes-2.png " alt="Circle Image"
                             className="img-circle img-no-padding img-responsive"/>
                      </div>
                    </div>
                    <div className="col-xs-6">
                      Html Action
                    </div>

                    <div className="col-xs-3 text-right">
                      <btn className="btn btn-sm btn-azure btn-icon"><i className="fa fa-user"/></btn>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

}