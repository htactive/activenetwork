import React, {Component} from 'react';
import {virtualPath} from '../../commons/constant'
import {browserHistory} from 'react-router';
import {ANEventServiceInstance} from '../services/anevent-service';
import {JoinEventDialog} from '../components/join-event-dialog';
import {userStore} from '../store/user-store';

export class PostGrid extends Component {
  joinEventDialog;

  componentWillMount() {
    this.setState({
      posts: []
    });
  }

  async componentDidMount() {
    await this.loadEvents();
  }

  relayout() {
    $('#blog-landing').pinterest_grid({
      no_columns: 3,
      padding_x: 10,
      padding_y: 10,
      margin_bottom: 50,
      single_column_breakpoint: 700
    });
  }

  async loadEvents() {
    let newFeeds = await ANEventServiceInstance.getANEventsForNewFeed();
    this.setState({posts: newFeeds.posts, serverDateTimeNow: newFeeds.serverDateTimeNow}, this.relayout);
  }

  goToEventDetail(e, eventId) {
    e.preventDefault();
    browserHistory.push(`${virtualPath}/event/${eventId}`)
  }

  clickJoinEventDialog(eventId) {
    this.joinEventDialog && this.joinEventDialog.show(eventId);
  }

  getTimeSpan(d, n) {
    let durationData = moment.duration(moment(n) - moment(d))._data;
    if (durationData.years > 0) {
      return `Hơn ${durationData.years} năm trước`;
    }
    if (durationData.months) {
      return `${durationData.months} tháng trước`;
    }
    if (Math.floor(durationData.days / 7) > 0) {
      return `${Math.floor(durationData.days / 7)} tuần trước`
    }
    if (durationData.days > 0) {
      return `${durationData.days} ngày trước`;
    }
    if (durationData.hours > 1) {
      return `${durationData.hours} giờ trước`;
    }
    if (durationData.hours > 0) {
      return `1 giờ ${durationData.minutes} phút trước`;
    }
    if (durationData.minutes > 30) {
      return `Hơn nữa giờ trước`;
    }
    if (durationData.minutes > 10) {
      return `Khoảng nữa tiếng trước`;
    }
    if (durationData.minutes > 5) {
      return `Khoảng 10 phút trước`;
    }
    if (durationData.minutes > 1) {
      return `5 phút trước`;
    }
    if (durationData.seconds > 30) {
      return `Chưa đầy 1 phút trước`;
    }
    return `Vừa mới đây`;
  }

  async addEventToFavourites(post) {
    let addResult = await ANEventServiceInstance.addEventToFavourites({anEventId: post.anevent_id});
    if (addResult) {
      post.isFavorited = true;
    }
    this.forceUpdate();
  }

  async removeEventFromFavourites(post) {
    let removeResult = await ANEventServiceInstance.removeEventFromFavourites({anEventId: post.anevent_id});
    if (removeResult) {
      post.isFavorited = false;
    }
    this.forceUpdate();
  }

  render() {
    return (<div>
      <div className="container page-content ">
        <div className="row">
          <div className="col-md-12">
            <section id="blog-landing">
              {this.state.posts != null ? this.state.posts.map((post, x) =>
                (<article
                  key={x}
                  className="white-panel animated fadeInUp">

                  <div className="box box-widget">
                    <div className="box-header with-border">
                      <div className="user-block">
                        <img className="" src={post.host_avatar} alt="User Image"/>
                        <span className="username">
                          <span>
                            <a href="#">{post.host_name}</a>
                          </span>
                          <span className="sub-username"><span> đã tạo một </span><a
                            href="" onClick={(e) => this.goToEventDetail(e, post.anevent_id)}>sự kiện</a></span>
                        </span>
                        <span className="description"><abbr
                          title={moment(post.event_createdDate).format('DD [tháng] MM YYYY, [lúc] HH:mm')}>{this.getTimeSpan(post.event_createdDate, this.state.serverDateTimeNow)}</abbr></span>
                      </div>
                    </div>
                    {post.cover_image ?
                      <img className="img-responsive show-in-modal" src={post.cover_image} alt="Photo"/> : null}
                    <div className="box-body">
                      <a className="event-name" href=""
                         onClick={(e) => this.goToEventDetail(e, post.anevent_id)}>{post.title}</a>
                      <p dangerouslySetInnerHTML={{__html: post.shortDescription}}/>
                    </div>
                    <div className="box-footer">
                      <a type="button" onClick={() => this.clickJoinEventDialog(post.anevent_id)}><i
                        className="fa fa-plus"/> Tham gia
                      </a>
                      {post.isFavorited ?
                        <a type="button" onClick={() => this.removeEventFromFavourites(post)}><i
                          className="fa fa-heart active-icon"/>
                          Yêu thích
                        </a>
                        :
                        <a type="button" onClick={() => this.addEventToFavourites(post)}><i
                          className="fa fa-heart"/>
                          Yêu thích
                        </a>}

                      <a type="button"><i className="fa fa-comment"/>
                        Bình luận
                      </a>
                    </div>
                  </div>
                </article>)
              ) : null}
            </section>
          </div>
        </div>
      </div>
      <JoinEventDialog ref={(e) => this.joinEventDialog = e} currentUser={userStore.getState().currentUser.Id}/>
    </div>);
  }
}