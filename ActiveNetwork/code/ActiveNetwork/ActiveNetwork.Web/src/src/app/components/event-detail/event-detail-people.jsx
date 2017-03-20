import React, {Component} from 'react';
import {ANEventDetailServiceInstance} from '../../services/anevent-detail-service';
import {ANEventServiceInstance} from '../../services/anevent-service';
import {userStore} from '../../store/user-store';

export class EventDetailPeopleComponent extends Component {
  eventId;

  componentWillMount() {
    this.setState({
      eventMembers: {},
      eventRequestToJoins: {},
      isHost: false,
    });

    this.eventId = this.props.params.id;
  }

  componentDidMount() {
    this.getMemberData();
    this.getRequestToJoinData();
    this.checkHost();
  }

  async getMemberData() {
    let a = await ANEventDetailServiceInstance.getANEventDetailMember(this.eventId);
    this.setState({
      eventMembers: a,
    });
  }

  async getRequestToJoinData() {
    let a = await ANEventDetailServiceInstance.getANEventDetailRequestToJoin(this.eventId);
    this.setState({
      eventRequestToJoins: a,
    });
  }

  async checkHost() {
    let a = await ANEventDetailServiceInstance.getANEventDetailInformation(this.eventId);
    if (a != null) {
      if (a.Host.Id == userStore.getState().currentUser.Id)
        this.setState({isHost: true});
    }
  }

  clickApprove(RTJid) {
    let result = ANEventServiceInstance.approveJoinEvent(RTJid);
    if(result){

    }
  }

  clickDeny(RTJid) {
    let result = ANEventServiceInstance.denyJoinEvent(RTJid);
    if(result){

    }
  }

  render() {
    return (
      <div className="container page-content people">
        <div className="row">
          <div className="col">
            <div className="widget">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                  <tr>
                    <th><span>Tên</span></th>
                    <th><span>Ngày tham gia</span></th>
                    <th className="text-center"><span>Tình trạng</span></th>
                    <th><span>Email</span></th>
                    <th>&nbsp;</th>
                  </tr>
                  </thead>
                  <tbody>

                  {(this.state.eventMembers && this.state.eventMembers.ANEventMembers) ?
                    this.state.eventMembers.ANEventMembers.map((x) => (
                      <tr key={x.Id}>
                        <td>
                          <img src={x.User.Profile.Avatar.Url} alt=""/>
                          <a href="#" className="user-link">{x.User.Profile.FirstName}</a>
                          <span className="user-subhead">{x.User.Profile.LastName}</span>
                        </td>
                        <td>
                          2013/08/08
                        </td>
                        <td className="text-center">
                          <span className="label label-default">Thành viên</span>
                        </td>
                        <td>
                          <a href="#">{x.User.Username}</a>
                        </td>
                        <td>
                          {this.state.isHost ?
                            <div>
                              <a href="#" className="table-link danger">
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                      </span>
                              </a>
                            </div> : null}
                        </td>
                      </tr>
                    )) : null
                  }

                  {(this.state.eventRequestToJoins &&
                  this.state.eventRequestToJoins.ANEventRequestToJoins && this.state.isHost) ?
                    this.state.eventRequestToJoins.ANEventRequestToJoins.map((x) => (
                      <tr key={x.Id}>
                        <td>
                          <img src={x.User.Profile.Avatar.Url} alt=""/>
                          <a href="#" className="user-link">{x.User.Profile.FirstName}</a>
                          <span className="user-subhead">{x.User.Profile.LastName}</span>
                        </td>
                        <td>
                          2013/08/08
                        </td>
                        <td className="text-center">
                          <span className="label label-warning">Chờ duyệt</span>
                        </td>
                        <td>
                          <a href="#">{x.User.Username}</a>
                        </td>
                        <td>
                          {this.state.isHost ? <div>
                              <a href="" className="table-link success" onClick={(e) => {
                                e.preventDefault();
                                this.clickApprove(x.Id)}}>
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-check-circle fa-stack-1x fa-inverse"></i>
                      </span>
                              </a>
                              <a href="" className="table-link danger" onClick={() => this.clickDeny(x.Id)}>
                          <span className="fa-stack">
                          <i className="fa fa-square fa-stack-2x"></i>
                          <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                          </span>
                              </a>
                            </div>
                            : null}
                        </td>
                      </tr>
                    )) : null
                  }
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>);
  }
}