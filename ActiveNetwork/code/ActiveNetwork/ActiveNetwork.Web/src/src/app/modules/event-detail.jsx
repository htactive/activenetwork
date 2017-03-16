import React, {Component} from 'react';
import {EventDetailHeaderComponent} from '../components/event-detail-header';

export class EventDetailPage extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="row page-content">
        <div className="col-md-8 col-md-offset-2">
          <EventDetailHeaderComponent eventId={this.props.params.id}/>
          {this.props.children}
        </div>
      </div>
    );
  }
}