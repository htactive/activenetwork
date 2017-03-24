import React, {Component} from 'react';
import {virtualPath} from '../../../commons/constant'
import {browserHistory} from 'react-router';
import {ANEventDetailServiceInstance} from '../../services/anevent-detail-service'
import {JoinEventDialog} from '../join-event-dialog';
import {MessageBox, MessageBoxType, MessageBoxButtons, MessageBoxResult} from '../../../commons/message-box';

const CURRENT_TAB_WALL = 'wall',
  CURRENT_TAB_DESCRIPTION = 'description',
  CURRENT_TAB_PEOPLE = 'people',
  CURRENT_TAB_PHOTOS = 'photos';

export class EventDetailHeaderComponent extends Component {
  joinEventDialog;

  componentWillMount() {

    this.setState({
      currentTab: CURRENT_TAB_WALL,
      eventHeader: {EventCoverPhoto: {Url: "/img/cover/loading.jpg"}},
      hasData: false
    });
  }

  async componentDidMount() {
    this.setState({eventHeader: await this.getData(this.props.eventId), hasData: true});
  }

  async componentWillReceiveProps(props) {
    this.setState({eventHeader: await this.getData(props.eventId), hasData: true});
  }

  async getData(eventId) {
    return await ANEventDetailServiceInstance.getANEventDetailHeader(eventId);
  }

  changeTab(e, tab) {
    this.setState({
      currentTab: tab
    });
    e.preventDefault();
    browserHistory.push(`${virtualPath}/event/${this.props.eventId}/${tab}`)
  }

  async clickJoinEventDialog(eventId) {
    if (this.joinEventDialog) {
      let sendRequestResult = await this.joinEventDialog.show(eventId);
      if (sendRequestResult) {
        this.state.eventHeader.IsPendingMember = true;
        this.forceUpdate();
      }
    }
  }

  async  clickCancelRequestToJoin(eventId) {
    let result = await
      MessageBox.instance.show({
        title: "Xác nhận",
        content: "Bạn có chắn muốn hủy yêu cầu tham gia vào sự kiện này",
        type: MessageBoxType.Confirmation,
        buttons: MessageBoxButtons.YesNo
      });

    if (result == MessageBoxResult.Yes) {
      let cancelResult = await ANEventDetailServiceInstance.cancelMyRequestToJoin(eventId);
      if (cancelResult) {
        this.state.eventHeader.IsPendingMember = false;
        this.forceUpdate();
      }
      else {
        await
          MessageBox.instance.show({
            title: "Lỗi",
            content: "Hủy yêu cầu thất bại",
            type: MessageBoxType.Error,
            buttons: MessageBoxButtons.OK
          });
      }
    }
  }

  async clickLeaveEvent(eventId) {
    let result = await
      MessageBox.instance.show({
        title: "Xác nhận",
        content: "Bạn có chắn muốn rời khỏi sự kiện này",
        type: MessageBoxType.Confirmation,
        buttons: MessageBoxButtons.YesNo
      });

    if (result == MessageBoxResult.Yes) {
      let cancelResult = await ANEventDetailServiceInstance.leaveEvent(eventId);
      if (cancelResult) {
        this.state.eventHeader.IsMember = false;
        this.forceUpdate();
      }
      else {
        await
          MessageBox.instance.show({
            title: "Lỗi",
            content: "Rời khỏi sự kiện thất bại",
            type: MessageBoxType.Error,
            buttons: MessageBoxButtons.OK
          });
      }
    }
  }

  renderRightMenu() {
    return (

      <ul className="right-meu">
        {
          !this.state.hasData ?
            <li><i className="fa fa-spinner fa-spin"/></li>
            :
            this.state.eventHeader.IsHost ?
              null :
              this.state.eventHeader.IsPendingMember ?
                <li>
                  <button type="button" onClick={() => this.clickCancelRequestToJoin(this.props.eventId)}
                          className="btn btn-lg btn-primary pull-right">Hủy yêu cầu tham gia
                  </button>
                </li>
                :
                this.state.eventHeader.IsMember ?
                  <li>
                    <button type="button" onClick={() => this.clickLeaveEvent(this.props.eventId)}
                            className="btn btn-lg btn-primary pull-right">Rời khỏi sự kiện
                    </button>
                  </li> :
                  <li>
                    <button type="button" onClick={() => this.clickJoinEventDialog(this.props.eventId)}
                            className="btn btn-lg btn-primary pull-right">Tham gia
                    </button>
                  </li>
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="cover profile">
            <div className="wrapper">
              <div className="image">
                <img src={this.state.eventHeader.EventCoverPhoto.Url} className="show-in-modal" alt="people"/>
              </div>
            </div>
            <div className="cover-info">
              <div className="name"><a href="#">{this.state.eventHeader.EventTitle}</a></div>
              <ul className="cover-nav">
                <li className={this.state.currentTab == CURRENT_TAB_WALL ? 'active' : ''}><a href=""
                                                                                             onClick={(e) => this.changeTab(e, CURRENT_TAB_WALL)}><i
                  className="fa fa-fw fa-bars"/> Bài đăng</a></li>

                <li className={this.state.currentTab == CURRENT_TAB_DESCRIPTION ? 'active' : ''}><a href=""
                                                                                                    onClick={(e) => this.changeTab(e, CURRENT_TAB_DESCRIPTION)}><i
                  className="fa fa-fw fa-user"/> Mô tả</a></li>

                <li className={this.state.currentTab == CURRENT_TAB_PEOPLE ? 'active' : ''}><a href=""
                                                                                               onClick={(e) => this.changeTab(e, CURRENT_TAB_PEOPLE)}><i
                  className="fa fa-fw fa-users"/>
                  Người tham gia</a></li>

                <li className={`${this.state.currentTab == CURRENT_TAB_PHOTOS ? 'active' : ''} hidden`}><a href=""
                                                                                                           onClick={(e) => this.changeTab(e, CURRENT_TAB_PHOTOS)}><i
                  className="fa fa-fw fa-image"/>
                  Hình ảnh</a></li>
              </ul>
              {this.renderRightMenu()}
            </div>
          </div>
        </div>
        <JoinEventDialog ref={(e) => this.joinEventDialog = e}/>
      </div>
    );
  }

}