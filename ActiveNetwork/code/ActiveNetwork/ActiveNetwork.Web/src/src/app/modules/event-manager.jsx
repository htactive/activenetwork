import React, {Component} from 'react';
import {userStore} from '../store/user-store';
import {ANEventServiceInstance} from '../services/anevent-service';
import {virtualPath} from '../../commons/constant'
import {browserHistory} from 'react-router';
var eventGroups = [];
export class EventManager extends Component {

  componentWillMount() {
    this.loadCreatedEvents();
    this.setState({
      collapseType: 'in',
      eventGroups: [],
      evListType: 'Sự kiện đã tạo'
    });
  }

  async componentDidMount() {
    await this.loadCreatedEvents();
  }

  async loadCreatedEvents() {
    let currentUser = userStore.getState().currentUser;
    if (currentUser == undefined || currentUser == null) {
      window.location.href = '/login';
      return;
    }

    let posts = await ANEventServiceInstance.getANEventsByHost(currentUser.Id);
    eventGroups = posts;
    this.setState({
      eventGroups: eventGroups,
      evListType: 'Sự kiện đã tạo'
    });
  }

  async loadJoinedEvents() {
    let currentUser = userStore.getState().currentUser;
    if (currentUser == undefined || currentUser == null) {
      window.location.href = '/login';
      return;
    }

    let posts = await ANEventServiceInstance.getJoinedANEvents(currentUser.Id);
    eventGroups = posts;
    this.setState({
      eventGroups: eventGroups,
      evListType: 'Sự kiện đã tham gia'
    });
  }

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
                  <h5 style={{color: 'black'}}>Danh sách sự kiện</h5>
                  <ul className="folder-list" style={{padding: 0}}>
                    <li><a href="#" onClick={() => this.showMyEvents()}><i className="fa fa-align-right"/> Sự kiện đã
                      tạo</a></li>
                    <li><a href="#" onClick={() => this.showJoinedEvents()}><i className="fa fa-align-right"/> Sự kiện
                      đã tham gia</a></li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
          <EventManagerList evListType={this.state.evListType} eventGroups={this.state.eventGroups}
                            collapseType={this.state.collapseType}/>
          <div className="col-md-3">
            <div className="ibox float-e-margins">
              <div className="ibox-content">
                <div className="file-manager">
                  <div className="hr-line-dashed"></div>
                  <div className="hr-line-dashed"></div>
                  <h5 style={{color: 'black'}}>Sự kiện trong tuần</h5>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }

  showMyEvents() {
    this.loadCreatedEvents();
  }

  showJoinedEvents() {
    this.loadJoinedEvents();
  }
}

export class EventManagerList extends Component {

  componentWillMount() {
    this.setState({
      isShowDelete: false,
      hoveredId: 0
    });
  }

  getBgrImageStyle(url) {
    return {
      backgroundImage: 'url(' + url + ')'
    }
  }

  goToEventDetail(e, eventId) {
    e.preventDefault();
    browserHistory.push(`${virtualPath}/event/${eventId}`)
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="col-md-12" style={{backgroundColor: '#fff', paddingBottom: 10, marginBottom: 5}}>
          <h3>{this.props.evListType}</h3>
        </div>
        {this.props.eventGroups != null ? this.props.eventGroups.map((evGroup, x) =>
            (
              <div key={x} className="col-md-12" style={{backgroundColor: '#fff', marginBottom: 20}}>
                <div className="row" style={{padding: 15}}>
                  <a style={{cursor: 'pointer', color: '#000'}} data-toggle="collapse"
                     data-target={`#${evGroup.Year}`}>Sự kiện từ {evGroup.Year}</a>
                </div>
                <div id={evGroup.Year} className={`collapse ${this.props.collapseType}`}>
                  {evGroup.EventMonth != null ? evGroup.EventMonth.map((evMonth, y) =>
                      (
                        <div key={y}>
                          <div className="row"
                               style={{
                                 padding: '3px 15px',
                                 backgroundColor: '#f6f7f9',
                                 borderBottom: '1px solid #E9EAED',
                                 borderTop: '1px solid #E9EAED'
                               }}>
                            <a style={{cursor: 'pointer', color: '#000', color: '#969696'}}
                               data-toggle="collapse"
                               data-target={`#${evGroup.Year}_${evMonth.Month}`}>THÁNG {evMonth.Month}</a>
                          </div>
                          <div id={`${evGroup.Year}_${evMonth.Month}`}
                               className={`collapse ${this.props.collapseType}`}>
                            {evMonth.Events != null ? evMonth.Events.map((ev, z) =>
                                (
                                  <div key={z} className="row" style={{padding: 15}}>
                                    <div className="col-md-4 no-padding">
                                      <div className="image-item"
                                           style={this.getBgrImageStyle(ev.CoverPhoto != null ? ev.CoverPhoto.Url : '')}
                                           onClick={(e) => this.goToEventDetail(e, ev.Id)}>
                                        <div>
                                          <span className="fa fa-calendar-check-o"/>
                                          <span>&nbsp;{ev.Day}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-8 event-info-section" style={{paddingRight: 5}} >
                                      <a href="#" className="delete-event-ico"><i
                                        className="fa fa-times "/></a>

                                      <div
                                        style={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap'
                                        }}>
                                        <a href="#"
                                           onClick={(e) => this.goToEventDetail(e, ev.Id)}>{ev.Information.Title} &nbsp;</a>
                                      </div>
                                      <div style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        color: '#969696'
                                      }}>
                                        <span>{ev.startDate}</span> <span>Tại {ev.Information.Location || ''}</span>
                                      </div>
                                      <div style={{paddingTop: 5}} className="cutline">
                                        {ev.Information.Description } &nbsp;
                                      </div>
                                      <div style={{paddingTop: 10, color: '#969696'}}>
                                        <span>Số người tham dự: </span>
                                        <span>{ev.NumberOfMember}</span>
                                      </div>
                                    </div>
                                  </div>
                                )) : null
                            }
                          </div>
                        </div>
                      )
                    ) : null}
                </div>
              </div>
            )
          ) : null
        }
      </div>
    );
  }
}