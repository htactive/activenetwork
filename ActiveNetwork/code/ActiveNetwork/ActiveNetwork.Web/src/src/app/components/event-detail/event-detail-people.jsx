import React, {Component} from 'react';
import {ANEventDetailServiceInstance} from '../../services/anevent-detail-service';
import {ANEventServiceInstance} from '../../services/anevent-service';
import {userStore} from '../../store/user-store';
const localStatusEnum = {
  unknown: 0,
  member: 1,
  requestToJoin: 2,
}

export class EventDetailPeopleComponent extends Component {
  eventId;

  componentWillMount() {
    this.setState({
      isHost: false,
      user: [],
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
    if (a != null) {
      this.state.user = this.state.user.concat(a.ANEventMembers.map(x => {
        x.localStatus = localStatusEnum.member;
        return x;
      }));
      this.forceUpdate();
    }
  }

  async getRequestToJoinData() {
    let a = await ANEventDetailServiceInstance.getANEventDetailRequestToJoin(this.eventId);
    if (a != null) {
      this.state.user = this.state.user.concat(a.ANEventRequestToJoins.map(x => {
        x.localStatus = localStatusEnum.requestToJoin;
        return x;
      }));
      this.forceUpdate();
    }
  }

  async checkHost() {
    let a = await ANEventDetailServiceInstance.getANEventDetailInformation(this.eventId);
    if (a != null) {
      if (a.Host.Id == userStore.getState().currentUser.Id)
        this.setState({isHost: true});
    }
  }

  clickApprove(RTJid, index) {
    let result = ANEventServiceInstance.approveJoinEvent(RTJid);
    if (result) {
      this.state.user[index].localStatus = localStatusEnum.member;
      this.forceUpdate();
    }
  }

  clickDeny(RTJid, index) {
    let result = ANEventServiceInstance.denyJoinEvent(RTJid);
    if (result) {
      this.state.user[index].localStatus = localStatusEnum.unknown;
      this.forceUpdate();
    }
  }

  clickKick(memberId, index) {
    debugger;
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

                  {this.state.user != null ? this.state.user.map((x, index) => (
                      x.localStatus != localStatusEnum.unknown ?
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
                            {x.localStatus == localStatusEnum.member
                              ? <span className="label label-primary">Thành viên</span>
                              : <span className="label label-warning">Chờ duyệt</span>}
                          </td>
                          <td>
                            <a href="#">{x.User.Username}</a>
                          </td>
                          <td>
                            {this.state.isHost ?
                              x.localStatus == localStatusEnum.requestToJoin ?
                                <div>
                                  <a href="" className="table-link success" onClick={(e) => {
                                    e.preventDefault();
                                    this.clickApprove(x.Id, index)
                                  }}>
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-check-circle fa-stack-1x fa-inverse"></i>
                      </span>
                                  </a>
                                  <a href="" className="table-link danger" onClick={(e) => {
                                    e.preventDefault();
                                    this.clickDeny(x.Id, index)}}>
                          <span className="fa-stack">
                          <i className="fa fa-square fa-stack-2x"></i>
                          <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                          </span>
                                  </a>
                                </div>
                                :
                                <div>
                                  <a href="" className="table-link danger" onClick={() => {
                                    e.preventDefault();
                                    this.clickKick(x.Id, index)}}>
                          <span className="fa-stack">
                          <i className="fa fa-square fa-stack-2x"></i>
                          <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                          </span>
                                  </a>
                                </div>
                              : null}
                          </td>
                        </tr> : null
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