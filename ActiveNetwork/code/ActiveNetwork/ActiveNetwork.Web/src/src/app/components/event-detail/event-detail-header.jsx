import React, {Component} from 'react';
import {virtualPath} from '../../../commons/constant'
import {browserHistory} from 'react-router';
import {ANEventDetailServiceInstance} from '../../services/anevent-detail-service';
import {ANEventServiceInstance} from '../../services/anevent-service';
import {JoinEventDialog} from '../join-event-dialog';
import {MessageBox, MessageBoxType, MessageBoxButtons, MessageBoxResult} from '../../../commons/message-box';
import {EventTitleEditor} from './event-title-editor';

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


  hideChangeCoverPhotoLink() {
    this.setState({isChangeCoverPhotoLinkShown: false});
  }

  showChangeCoverPhotoLink() {
    this.setState({isChangeCoverPhotoLinkShown: true});
  }

  async startUploadCoverPhoto(v) {
    if (v.target.files && v.target.files[0]) {

      let image = v.target.files[0];
      let uploadResult = await ANEventServiceInstance.uploadCoverPhoto({
        cover: image
      });
      if (uploadResult) {
        let updateResult = await ANEventServiceInstance.updateCoverPhoto({
          eventId: this.props.eventId,
          imageId: uploadResult.Id
        });
        if (updateResult) {
          this.state.eventHeader.EventCoverPhoto = updateResult;
          this.forceUpdate();
        }
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
              <div className="image" onMouseOver={() => this.showChangeCoverPhotoLink()}
                   onMouseOut={() => this.hideChangeCoverPhotoLink()}>
                {

                  this.state.eventHeader.IsHost ?
                    <a
                      className={`file-input btn btn-primary btn-file btn-change-cover-photo${this.state.isChangeCoverPhotoLinkShown ? ' show' : ''}`}><i
                      className="fa fa-camera"/> Đổi hình nền <input type="file" multiple="" accept="image/*"
                                                                     onChange={v => this.startUploadCoverPhoto(v)}/>
                    </a> : null
                }

                <img src={this.state.eventHeader.EventCoverPhoto.Url} className="show-in-modal" alt="people"/>
              </div>
            </div>
            <div className="cover-info">
              <div className="name">
                <EventTitleEditor isHost={this.state.eventHeader.IsHost} EventTitle={this.state.eventHeader.EventTitle}
                                  eventId={this.props.eventId}
                                  afterSaveChanged={(e) => {
                                    this.state.eventHeader.EventTitle = e.title;
                                    this.forceUpdate();
                                  }}
                />
              </div>
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