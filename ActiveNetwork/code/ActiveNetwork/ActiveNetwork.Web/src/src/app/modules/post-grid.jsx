import React, {Component} from 'react';
import {virtualPath} from '../../commons/constant'
import {browserHistory} from 'react-router';
import {ANEventServiceInstance} from '../services/anevent-service';
import {JoinEventDialog} from '../components/join-event-dialog';

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
    let posts = await ANEventServiceInstance.getANEventsForNewFeed();
    this.setState({posts: posts}, this.relayout);
  }

  goToEventDetail(e) {
    e.preventDefault();
    browserHistory.push(`${virtualPath}/event`)
  }

  clickJoinEventDialog(){
    this.joinEventDialog && this.joinEventDialog.show();
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
                            href="" onClick={(e) => this.goToEventDetail(e)}>sự kiện</a></span>
                        </span>
                        <span className="description"><abbr title="3 tháng 2 2017 lúc 19:58">1 giờ trước</abbr></span>
                      </div>
                    </div>
                    <div className="box-body">
                      <a className="event-name" href="" onClick={(e) => this.goToEventDetail(e)}>Sự kiện nhậu mừng sinh
                        nhật Bill Gate</a>
                      <p dangerouslySetInnerHTML={{__html: post.description}}/>
                    </div>
                    <img className="img-responsive show-in-modal" src={post.cover_image} alt="Photo"/>
                    <div className="box-footer">
                      <a type="button" onClick={this.clickJoinEventDialog.bind(this)}><i className="fa fa-plus"/> Tham gia
                      </a>
                      <a type="button"><i className="fa fa-heart"/>
                        Yêu thích
                      </a>
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
      <JoinEventDialog ref={(e) => this.joinEventDialog = e}/>
    </div>);
  }
}