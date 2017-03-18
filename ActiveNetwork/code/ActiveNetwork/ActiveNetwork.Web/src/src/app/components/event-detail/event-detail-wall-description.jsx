import React, {Component} from 'react';
import {userStore} from '../../store/user-store';

export class EventDetailWallDescriptionComponent extends Component {
  componentWillMount() {
    this.setState({});
  }

  componentWillReceiveProps(props) {
    let isHost = (userStore.getState().currentUser || {Id: 0}).Id === props.eventDecription.Host.Id;
    let host = props.eventDecription.Host || {};
    host.Profile = host.Profile || {};

    let hostFullName = `${`${host.Profile.LastName} ${host.Profile.MiddleName}`.trim()} ${host.Profile.FirstName}`.trim();
    let eventLocationName = (props.eventDecription.EventInformation.Location || {Name: ''}).Name;
    let eventStartDate = props.eventDecription.EventInformation.StartDate;
    let eventEndDate = props.eventDecription.EventInformation.EndDate;

    this.setState({
      isHost: isHost,
      host_fullName: hostFullName,
      event_locationName: eventLocationName,
      event_startDate: eventStartDate,
      event_endDate: eventEndDate
    });
  }

  render() {
    return (
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-caption">Mô tả sự kiện</h3>
        </div>
        <div className="widget-body bordered-top bordered-sky">
          <ul className="list-unstyled profile-about margin-none">
            <li className="padding-v-5">
              {this.state.isHost ? null :
                <div className="row">
                  <div className="col-sm-3"><span className="text-muted">Nguời tạo</span></div>
                  <div className="col-sm-9"><a href="">{this.state.host_fullName}</a></div>
                </div>
              }
            </li>
            <li className="padding-v-5">
              <div className="row">
                <div className="col-sm-4"><span className="text-muted">Địa điểm</span></div>
                <div className="col-sm-8"><a href="">{this.state.event_locationName}</a></div>
              </div>
            </li>
            <li className="padding-v-5">
              <div className="row">
                <div className="col-sm-4"><span className="text-muted">Thời gian bắt đầu</span></div>
                <div className="col-sm-8">{this.state.event_startDate}</div>
              </div>
            </li>
            <li className="padding-v-5">
              <div className="row">
                <div className="col-sm-4"><span className="text-muted">Thời gian kết thúc</span></div>
                <div className="col-sm-8">{this.state.event_endDate}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

}