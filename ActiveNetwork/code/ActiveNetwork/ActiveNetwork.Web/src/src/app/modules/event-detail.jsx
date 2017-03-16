import React, {Component} from 'react';
import {EventDetailHeaderComponent} from '../components/event-detail/event-detail-header';

export class EventDetailPage extends Component {
  eventId;
  componentWillMount() {
    this.eventId = this.props.params.id;
  }

  render() {
    return (
      <div className="row page-content">
        <div className="col-md-8 col-md-offset-2">
          <EventDetailHeaderComponent eventId={this.eventId}/>
          {this.props.children}
        </div>
      </div>
    );
  }
}