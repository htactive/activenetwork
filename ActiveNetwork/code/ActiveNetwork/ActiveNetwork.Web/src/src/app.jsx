import React from 'react';
import ReactDOM from 'react-dom';
import {Index} from './app/index';
import {PostGrid} from './app/modules/post-grid';
import {ProfilePage} from './app/modules/profile'
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {virtualPath} from './app/commons/constant'
import {EventDetailPage} from './app/modules/event-detail';
import {EventDetailWallComponent} from './app/components/event-detail-wall';
import {EventDetailDescriptionComponent} from './app/components/event-detail-description';
import {EventDetailPeopleComponent} from './app/components/event-detail-people';
import {EventDetailPhotosComponent} from './app/components/event-detail-photos';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={`${virtualPath}/`} component={Index}>
      <Route path={`${virtualPath}/post-grid`} component={PostGrid}/>
      <Route path={`${virtualPath}/profile-page`} component={ProfilePage}/>
      <Route path={`${virtualPath}/event`} component={EventDetailPage}>
        <Route path={`${virtualPath}/event/wall`} component={EventDetailWallComponent}/>
        <Route path={`${virtualPath}/event/description`} component={EventDetailDescriptionComponent}/>
        <Route path={`${virtualPath}/event/people`} component={EventDetailPeopleComponent}/>
        <Route path={`${virtualPath}/event/photos`} component={EventDetailPhotosComponent}/>
        <IndexRoute component={EventDetailWallComponent}/>
      </Route>
      <IndexRoute component={PostGrid}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
