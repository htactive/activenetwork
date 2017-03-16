import React, {Component} from 'react';
import {EventDetailHeaderComponent} from '../components/event-detail-header';

export class EventDetailPage extends Component {

  render() {
    return (
      <div className="row page-content">
        <div className="col-md-8 col-md-offset-2">
          <EventDetailHeaderComponent/>
          {this.props.children}
        </div>
      </div>
    );
  }
}