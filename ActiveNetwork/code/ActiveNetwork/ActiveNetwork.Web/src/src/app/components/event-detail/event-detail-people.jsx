import React, {Component} from 'react';
import {ANEventDetailServiceInstance} from '../../services/anevent-detail-service';

export class EventDetailPeopleComponent extends Component {
  eventId;

  componentWillMount() {
    this.setState({
      eventMembers: {},
      eventRequestToJoins: {},
    });

    this.eventId = this.props.params.id;
  }

  componentDidMount() {
    this.getMemberData();
    this.getRequestToJoinData();
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
                          <a href="#" className="table-link success">
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                      </span>
                          </a>
                          <a href="#" className="table-link">
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                      </span>
                          </a>
                          <a href="#" className="table-link danger">
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                      </span>
                          </a>
                        </td>
                      </tr>
                    )) : null
                  }

                  {(this.state.eventRequestToJoins && this.state.eventRequestToJoins.ANEventRequestToJoins) ?
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
                          <a href="#" className="table-link success">
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                      </span>
                          </a>
                          <a href="#" className="table-link">
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                      </span>
                          </a>
                          <a href="#" className="table-link danger">
                      <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                      </span>
                          </a>
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