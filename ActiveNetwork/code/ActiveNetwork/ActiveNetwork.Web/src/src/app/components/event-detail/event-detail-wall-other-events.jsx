import React, {Component} from 'react';
import {virtualPath} from '../../../commons/constant';
import {browserHistory} from 'react-router';

export class EventDetailWallOtherEventsComponent extends Component {

  componentWillMount() {
    this.setState({});
  }

  componentWillReceiveProps(props) {
    this.setState({
      otherEvents: props.otherEvents
    })
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
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-caption">Sự kiện khác</h3>
        </div>
        <div className="widget-body bordered-top bordered-sky">
          <div className="card">
            <div className="content">
              <ul className="list-unstyled team-members">
                {this.state.otherEvents == null ? null :
                  this.state.otherEvents.length != 0 ?
                    this.state.otherEvents.map((ev, z) =>
                      (
                        <div key={z} className="row" style={{padding: 15}}>
                          <div className="col-md-4 no-padding">
                            <div className="image-item-md event-cover-photo"
                                 style={this.getBgrImageStyle(ev.cover_image)}
                                 onClick={(e) => this.goToEventDetail(e, ev.id)}>
                            </div>
                          </div>
                          <div className="col-md-8 event-info-section" style={{paddingRight: 5, fontSize: 12}}>

                            <div
                              style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                              <a href="" title={ev.title}
                                 onClick={(e) => this.goToEventDetail(e, ev.id)}>{ev.title} &nbsp;</a>
                            </div>
                            <div style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              color: '#969696'
                            }}>
                              <span title={ev.start_day}><i>{ev.start_day}</i></span>
                            </div>
                            {ev.location ?
                            <div style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              color: '#969696'
                            }}>
                              <span title={ev.location}>Tại: <strong>{ev.location}</strong></span>
                            </div> : null}
                          </div>
                        </div>
                      )) : (<div className="row">Không có sự kiện liên quan.</div>)
                }
              </ul>

            </div>
          </div>
        </div>
      </div>
    );
  };

}