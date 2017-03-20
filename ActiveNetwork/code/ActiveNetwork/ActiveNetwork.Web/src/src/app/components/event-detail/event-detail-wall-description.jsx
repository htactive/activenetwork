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
    let eventLocationName = (props.eventDecription.EventInformation.ANEventLocation || {Address: ''}).Address;
    let eventStartDate = props.eventDecription.EventInformation.StartDate;
    let eventEndDate = props.eventDecription.EventInformation.EndDate;
    let eventShortDescription = props.eventDecription.EventInformation.ShortDescription;

    this.setState({
      isHost: isHost,
      host_fullName: hostFullName,
      event_locationName: eventLocationName,
      event_startDate: eventStartDate,
      event_endDate: eventEndDate,
      event_shortDescription: eventShortDescription
    });
  }

  render() {
    return (
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-caption">Mô tả sự kiện</h3>
        </div>
        <div className="widget-body bordered-top bordered-sky">
          <ul className="list-unstyled profile-about margin-none event-about">
            {this.state.isHost ? null :
              <li className="">
                <div className="row">
                  <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1 text-center" title="Người tạo"><span
                    className="text-muted"><i
                    className="fa fa-user"/></span></div>
                  <div className="col-sm-10 col-lg-10 col-md-10 col-xs-10"><a href="">{this.state.host_fullName}</a>
                  </div>
                </div>
              </li>
            }
            <li className="">
              <div className="row">
                <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1 text-center" title="Địa điểm"><span
                  className="text-muted"><i
                  className="fa fa-globe"/></span></div>
                <div className="col-sm-10 col-lg-10 col-md-10 col-xs-10">
                  <span> <a href="">{this.state.event_locationName}</a></span>
                </div>
              </div>
            </li>
            <li className="">
              <div className="row">
                <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1 col-xs-10 text-center"
                     title="Thời gian bắt đầu"><span className="text-muted"><i
                  className="fa fa-hourglass-start"/></span></div>
                <div
                  className="col-sm-10 col-lg-10 col-md-10 col-xs-10">{this.state.event_startDate ? moment(this.state.event_startDate).format('HH:mm [ngày] DD/MM/YYYY') : null}</div>
              </div>
            </li>
            {this.state.event_endDate ?
              <li className="">
                <div className="row">
                  <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1 text-center" title="Thời gian kết thúc"><span
                    className="text-muted"><i
                    className="fa fa-hourglass-end"/></span></div>
                  <div
                    className="col-sm-10 col-lg-10 col-md-10 col-xs-10">{moment(this.state.event_endDate).format('HH:mm [ngày] DD/MM/YYYY')}</div>
                </div>
              </li> : null}
            {this.state.event_shortDescription ?
              <li>
                <div className="row">
                  <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1 text-center" title="Thời gian kết thúc"><span
                    className="text-muted"><i
                    className="fa fa-sticky-note"/></span></div>
                  <div
                    className="col-sm-10 col-lg-10 col-md-10 col-xs-10">
                    <p
                      dangerouslySetInnerHTML={{__html: this.state.event_shortDescription.replace(/(?:\r\n|\r|\n)/g, '<br />')}}/>
                  </div>
                </div>
              </li> : null}
          </ul>
        </div>
      </div>
    );
  };

}