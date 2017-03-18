import React, {Component} from 'react';

export class EventDetailWallDescriptionComponent extends Component {

  render(){
    return(
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-caption">Mô tả sự kiện</h3>
        </div>
        <div className="widget-body bordered-top bordered-sky">
          <ul className="list-unstyled profile-about margin-none">
            <li className="padding-v-5">
              <div className="row">
                <div className="col-sm-4"><span className="text-muted">Nguời tạo</span></div>
                <div className="col-sm-8">{this.props.eventDecription.Host.Username}</div>
              </div>
            </li>
            <li className="padding-v-5">
              <div className="row">
                <div className="col-sm-4"><span className="text-muted">Địa điểm</span></div>
                <div className="col-sm-8">{this.props.eventDecription.EventInformation.Location}</div>
              </div>
            </li>
            <li className="padding-v-5">
              <div className="row">
                <div className="col-sm-4"><span className="text-muted">Thời gian bắt đầu</span></div>
                <div className="col-sm-8">{this.props.eventDecription.EventInformation.StartDate}</div>
              </div>
            </li>
            <li className="padding-v-5">
              <div className="row">
                <div className="col-sm-4"><span className="text-muted">Thời gian kết thúc</span></div>
                <div className="col-sm-8">{this.props.eventDecription.EventInformation.EndDate}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

}