import React, {Component} from 'react';
import {virtualPath} from '../commons/constant'
import {browserHistory} from 'react-router';

export class  PostGrid extends Component {

  componentWillMount() {
    let posts = [
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/1.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit.<a href="https://youtu.be/DLS0PA2cgoo">https://youtu.be/DLS0PA2cgoo</a>',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/2.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/3.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, ',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/4.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/5.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/6.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/7.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/8.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non so',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/9.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis.',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/1.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/2.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/3.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/4.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non ',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/5.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/6.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/7.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/8.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec,',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/9.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin ',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/1.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. ',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/2.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/3.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consevamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/4.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/5.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. ',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/6.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
      {
        host_name: 'Thuận Hồ',
        host_avatar: '/img/Friends/guy-6.jpg',
        cover_image: '/img/Photos/7.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        article_width: 0,
        article_top: 0,
        article_left: 0
      },
    ];
    this.setState({
      posts: posts
    });
  }

  componentDidMount() {
    $('#blog-landing').pinterest_grid({
      no_columns: 3,
      padding_x: 10,
      padding_y: 10,
      margin_bottom: 50,
      single_column_breakpoint: 700
    });

  }

  goToEventDetail(e) {
    e.preventDefault();
    browserHistory.push(`${virtualPath}/event`)
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
                            href="" onClick={(e)=>this.goToEventDetail(e)}>sự kiện</a></span>
                        </span>
                        <span className="description"><abbr title="3 tháng 2 2017 lúc 19:58">1 giờ trước</abbr></span>
                      </div>
                    </div>
                    <div className="box-body">
                      <a className="event-name" href="" onClick={(e)=>this.goToEventDetail(e)}>Sự kiện nhậu mừng sinh nhật Bill Gate</a>
                      <p dangerouslySetInnerHTML={{__html: post.description}} />
                    </div>
                    <img className="img-responsive show-in-modal" src={post.cover_image} alt="Photo"/>
                    <div className="box-footer">
                      <a type="button" ><i className="fa fa-plus"/> Tham gia
                      </a>
                      <a type="button" ><i className="fa fa-heart"/>
                        Yêu thích
                      </a>
                      <a type="button" ><i className="fa fa-comment"/>
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

    </div>);
  }
}