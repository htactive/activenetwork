import React, {Component} from 'react';

export class EventDetailWallMembersComponent extends Component {

  render(){
    return(
      <div className="widget widget-friends">
        <div className="widget-header">
          <h3 className="widget-caption">Người tham gia</h3>
        </div>
        <div className="widget-body bordered-top  bordered-sky">
          <div className="row">
            <div className="col-md-12">
              <ul className="img-grid" style={{margin: '0 auto'}}>
                {(this.props.eventMember && this.props.eventMember.ANEventMembers) ?
                  this.props.eventMember.ANEventMembers.map((x) => (
                    <li key={x.Id}>
                      <a href="#">
                        <img src={x.User.Profile.Avatar.Url} alt="image"/>
                      </a>
                    </li>
                  )) : null
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

}