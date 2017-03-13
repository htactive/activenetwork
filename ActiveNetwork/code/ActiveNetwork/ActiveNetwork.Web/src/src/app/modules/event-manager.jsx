import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {virtualPath} from '../../commons/constant'
var eventGroups = [
  {
    year: '2016',
    eventmonth: [
      {
        month: '1',
        events: [
          {
            host_name: 'Huân Nguyễn',
            title: 'Nhậu nhẹt độc thân',
            cover_image: '/img/Photos/1.jpg',
            description: 'Nhậu nhẹt độc thân Nhậu nhẹt độc thân Nhậu nhẹt độc thân Nhậu nhẹt độc thân <a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
            startDate: '01/01/2016',
            day: '1',
            location: 'Quán nhậu bạn tôi',
            numberOfMember: 20
          },
          {
            host_name: 'Huân Nguyễn 1',
            title: 'Nhậu nhẹt độc thân 1',
            cover_image: '/img/Photos/1.jpg',
            description: 'Nhậu nhẹt độc thân Nhậu nhẹt độc thân Nhậu nhẹt độc thân Nhậu nhẹt độc thân 111 <a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
            startDate: '03/01/2016',
            day: '3',
            location: 'Quán nhậu bạn tôi gần đường nguyễn văn linh',
            numberOfMember: 25
          }
        ]
      },
      {
        month: '3',
        events: [
          {
            host_name: 'Hoang Pham',
            title: 'Xem phim cuoi tuan',
            cover_image: '/img/Photos/1.jpg',
            description: 'Xem phim cuoi tuan Xem phim cuoi tuan Xem phim cuoi tuan <a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
            startDate: '11/03/2016',
            day: '11',
            location: 'CGV',
            numberOfMember: 20
          },
          {
            host_name: 'Hoang Pham 111',
            title: 'Xem phim cuoi tuan111',
            cover_image: '/img/Photos/1.jpg',
            description: 'Xem phim cuoi tuan Xem phim cuoi tuan Xem phim cuoi tuan 111 <a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
            startDate: '15/03/2016',
            day: '15',
            location: 'con gà vàng',
            numberOfMember: 20
          }
        ]
      }
    ]
  },
  {
    year: '2015',
    eventmonth: [
      {
        month: '3',
        events: [
          {
            host_name: 'Huân Nguyễn',
            title: 'Go kill yourself',
            cover_image: '/img/Photos/1.jpg',
            description: 'Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer',
            startDate: '01/03/2015',
            day: '1',
            location: 'Cầu Thuận Phước',
            numberOfMember: 20
          }
        ]
      },
      {
        month: '5',
        events: [
          {
            host_name: 'Hoang Pham',
            title: 'Travelling',
            cover_image: '/img/Photos/1.jpg',
            description: 'Thailand welcome, Thailand welcome,Thailand welcome,Thailand welcome,Thailand welcome,Thailand welcome, Thailand welcome, Thailand welcome',
            startDate: '13/05/2015',
            day: '13',
            location: 'Sài gòn',
            numberOfMember: 20
          }
        ]
      }
    ]
  }
];
var eventGroups1 = [
  {
    year: '2015',
    eventmonth: [
      {
        month: '1',
        events: [
          {
            host_name: 'Huân Nguyễn',
            title: 'Nhậu nhẹt độc thân',
            cover_image: '/img/Photos/1.jpg',
            description: 'Nhậu nhẹt độc thân Nhậu nhẹt độc thân Nhậu nhẹt độc thân Nhậu nhẹt độc thân <a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
            startDate: '01/01/2015',
            day: '1',
            location: 'Quán nhậu bạn tôi',
            numberOfMember: 20
          },
          {
            host_name: 'Huân Nguyễn 1',
            title: 'Nhậu nhẹt độc thân 1',
            cover_image: '/img/Photos/1.jpg',
            description: 'Nhậu nhẹt độc thân Nhậu nhẹt độc thân Nhậu nhẹt độc thân Nhậu nhẹt độc thân 111 <a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
            startDate: '03/01/2015',
            day: '3',
            location: 'Quán nhậu bạn tôi gần đường nguyễn văn linh',
            numberOfMember: 25
          }
        ]
      },
      {
        month: '3',
        events: [
          {
            host_name: 'Hoang Pham',
            title: 'Xem phim cuoi tuan',
            cover_image: '/img/Photos/1.jpg',
            description: 'Xem phim cuoi tuan Xem phim cuoi tuan Xem phim cuoi tuan <a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
            startDate: '11/03/2015',
            day: '11',
            location: 'CGV',
            numberOfMember: 20
          },
          {
            host_name: 'Hoang Pham 111',
            title: 'Xem phim cuoi tuan111',
            cover_image: '/img/Photos/1.jpg',
            description: 'Xem phim cuoi tuan Xem phim cuoi tuan Xem phim cuoi tuan 111 <a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
            startDate: '15/03/2015',
            day: '15',
            location: 'con gà vàng',
            numberOfMember: 20
          }
        ]
      }
    ]
  },
  {
    year: '2014',
    eventmonth: [
      {
        month: '3',
        events: [
          {
            host_name: 'Huân Nguyễn',
            title: 'Go kill yourself',
            cover_image: '/img/Photos/1.jpg',
            description: 'Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer, Last summer',
            startDate: '01/03/2014',
            day: '1',
            location: 'Cầu Thuận Phước',
            numberOfMember: 20
          }
        ]
      },
      {
        month: '5',
        events: [
          {
            host_name: 'Hoang Pham',
            title: 'Travelling',
            cover_image: '/img/Photos/1.jpg',
            description: 'Thailand welcome, Thailand welcome,Thailand welcome,Thailand welcome,Thailand welcome,Thailand welcome, Thailand welcome, Thailand welcome',
            startDate: '13/05/2014',
            day: '13',
            location: 'Sài gòn',
            numberOfMember: 20
          }
        ]
      }
    ]
  }
];
export class EventManager extends Component {

  componentWillMount() {
    this.setState({
      eventGroups: eventGroups,
      evListType: 'Sự kiện đã tạo'
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
                    <li><a href="#" onClick={() => this.showMyEvents()}><i className="fa fa-align-right"/> Sự kiện đã tạo</a></li>
                    <li><a href="#" onClick={() => this.showJoinedEvents()}><i className="fa fa-align-right"/> Sự kiện đã tham gia</a></li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
          <EventManagerList evListType={this.state.evListType} eventGroups={this.state.eventGroups}/>
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
    this.setState({
      eventGroups: eventGroups,
      evListType: 'Sự kiện đã tạo'
    });
  }

  showJoinedEvents() {
    this.setState({
      eventGroups: eventGroups1,
      evListType: 'Sự kiện đã tham gia'
    });
  }
}

export class EventManagerList extends Component {
  render(){
    return (
      <div className="col-md-6">
        <div className="col-md-12" style={{backgroundColor: '#fff', paddingBottom:10, marginBottom:5}}>
          <h3>{this.props.evListType}</h3>
        </div>
        {this.props.eventGroups != null ? this.props.eventGroups.map((evGroup, x) =>
            (
              <div key={x} className="col-md-12" style={{backgroundColor: '#fff', marginBottom: 20}}>
                <div className="row" style={{padding: 15}}>
                  <a style={{cursor: 'pointer', color: '#000'}} data-toggle="collapse"
                     data-target={`#${evGroup.year}`}>Sự kiện từ {evGroup.year}</a>
                </div>
                <div id={evGroup.year} className="collapse in">
                  {evGroup.eventmonth != null ? evGroup.eventmonth.map((evMonth, y) =>
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
                          <div id={`${evGroup.year}_${evMonth.month}`} className="collapse in">
                            {evMonth.events != null ? evMonth.events.map((ev, z) =>
                                (
                                  <div key={z} className="row" style={{padding: 15}}>
                                    <div className="col-md-4 no-padding">
                                      <img className="img-responsive show-in-modal" src={ev.cover_image}
                                           alt="Photo"/>
                                    </div>
                                    <div className="col-md-8" style={{paddingRight: 5}}>
                                      <div
                                        style={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap'
                                        }}>
                                        <a href="#">{ev.title}</a></div>
                                      <div style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        color: '#969696'
                                      }}>
                                        <span>{ev.startDate}</span> <span>Tại {ev.location}</span></div>
                                      <div style={{paddingTop: 5}} className="cutline">
                                        {ev.description}
                                      </div>
                                      <div style={{paddingTop: 10, color: '#969696'}}>
                                        <span>Số người tham dự: </span>
                                        <span>{ev.numberOfMember}</span>
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