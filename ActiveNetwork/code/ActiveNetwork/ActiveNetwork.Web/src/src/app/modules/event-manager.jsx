import React, {Component} from 'react';
import {userStore} from '../store/user-store';
import {ANEventServiceInstance} from '../services/anevent-service';
import {virtualPath} from '../../commons/constant'
import {browserHistory} from 'react-router';
var eventGroups = [];
export class EventManager extends Component {

  componentWillMount() {
    this.setState({
      collapseType: 'in',
      eventGroups: [],
      eventsInWeek: [],
      evListType: 'Sự kiện đã tạo'
    });
  }

  async componentDidMount() {
    await this.loadCreatedEvents();
    await this.loadEventsInWeek();
  }

  async loadCreatedEvents() {
    let currentUser = userStore.getState().currentUser;
    if (currentUser == undefined || currentUser == null) {
      window.location.href = '/login';
      return;
    }

    let posts = await ANEventServiceInstance.getANEventsByHost();
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

    let posts = await ANEventServiceInstance.getJoinedANEvents();
    eventGroups = posts;
    this.setState({
      eventGroups: eventGroups,
      evListType: 'Sự kiện đã tham gia'
    });
  }

  async loadFavouriteEvents() {
    let posts = await ANEventServiceInstance.getMyFavouriteEvents();
    this.setState({
      eventGroups: posts,
      evListType: 'Sự kiện yêu thích'
    });
  }

  async loadEventsInWeek() {
    let currentUser = userStore.getState().currentUser;
    if (currentUser == undefined || currentUser == null) {
      window.location.href = '/login';
      return;
    }

    let posts = await ANEventServiceInstance.getANEventsInWeek();
    this.setState({
      eventsInWeek: posts,
    });
  }

  getBgrImageStyle(url) {
    return {
      backgroundImage: 'url(' + url + ')',
      backgroundColor: '#545454'
    }
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

                    <li><a href="#" onClick={() => this.showFavouriteEvents()}><i className="fa fa-heart"/> Sự kiện
                      yêu thích</a></li>
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
                  {this.state.eventsInWeek != null ? this.state.eventsInWeek.map((ev, z) =>
                    (
                      <div key={z} className="row" style={{padding: 15}}>
                        <div className="col-md-4 no-padding">
                          <div className="image-item-md"
                               style={this.getBgrImageStyle(ev.cover_image)}
                               onClick={(e) => this.goToEventDetail(e, ev.id)}>
                            <div>
                              <span className="fa fa-calendar-check-o"/>
                              <span>&nbsp;{ev.day}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8 event-info-section" style={{paddingRight: 5, fontSize: 12}}>

                          <div
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                            <a href="#" title={ev.title}
                               onClick={(e) => this.goToEventDetail(e, ev.id)}>{ev.title} &nbsp;</a>
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: '#969696'
                          }}>
                            <span title={ev.start_day}>{ev.start_day}</span>
                          </div>
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: '#969696'
                          }}>
                            <span title={ev.location}>Tại {ev.location}</span>
                          </div>
                        </div>
                      </div>
                    )) : (<div className="row">Không có sự kiện trong tuần.</div>)
                  }
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

  showFavouriteEvents() {
    this.loadFavouriteEvents();
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
      backgroundImage: 'url(' + url + ')',
      backgroundColor: '#545454'
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
                   data-target={`#${evGroup.year}`}>Sự kiện từ {evGroup.year}</a>
              </div>
              <div id={evGroup.year} className={`collapse ${this.props.collapseType}`}>
                {evGroup.year_events != null ? evGroup.year_events.map((evMonth, y) =>
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
                           data-target={`#${evGroup.year}_${evMonth.month}`}>THÁNG {evMonth.month}</a>
                      </div>
                      <div id={`${evGroup.year}_${evMonth.month}`}
                           className={`collapse ${this.props.collapseType}`}>
                        {evMonth.events != null ? evMonth.events.map((ev, z) =>
                          (
                            <div key={z} className="row" style={{padding: 15}}>
                              <div className="col-md-4 no-padding">
                                <div className="image-item"
                                     style={this.getBgrImageStyle(ev.cover_image)}
                                     onClick={(e) => this.goToEventDetail(e, ev.id)}>
                                  <div>
                                    <span className="fa fa-calendar-check-o"/>
                                    <span>&nbsp;{ev.day}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8 event-info-section" style={{paddingRight: 5}}>
                                <a href="#" className="delete-event-ico"><i
                                  className="fa fa-times "/></a>

                                <div
                                  style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}>
                                  <a href="#"
                                     onClick={(e) => this.goToEventDetail(e, ev.id)}>{ev.title} &nbsp;</a>
                                </div>
                                {ev.start_day ?
                                  <div style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    color: '#969696'
                                  }}>
                                    <span><i>{ev.start_day}</i></span>
                                  </div>
                                  : null}

                                {ev.location ?
                                  <div style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    color: '#969696'
                                  }}>
                                    <span>Tại: <strong>{ev.location}</strong></span>
                                  </div> : null}
                                {ev.description ?
                                  <div style={{paddingTop: 5}} className="cutline">
                                    <p
                                      dangerouslySetInnerHTML={{__html: ev.description.replace(/(?:\r\n|\r|\n)/g, '<br />')}}/>
                                  </div> : null}
                                <div style={{paddingTop: 10, color: '#969696'}}>
                                  <span>Số người tham dự: </span>
                                  <span>{ev.number_of_member}</span>
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