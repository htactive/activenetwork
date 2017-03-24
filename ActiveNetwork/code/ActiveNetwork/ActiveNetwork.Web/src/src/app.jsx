import React from 'react';
import ReactDOM from 'react-dom';
import {Index} from './app/index';
import {PostGrid} from './app/modules/post-grid';
import {EditProfilePage} from './app/modules/edit-profile'
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {virtualPath} from './commons/constant'
import {EventDetailPage} from './app/modules/event-detail';
import {EventDetailWallComponent} from './app/components/event-detail/event-detail-wall';
import {EventDetailDescriptionComponent} from './app/components/event-detail/event-detail-description';
import {EventDetailPeopleComponent} from './app/components/event-detail/event-detail-people';
import {EventDetailPhotosComponent} from './app/components/event-detail/event-detail-photos';
import {EventManager} from './app/modules/event-manager';
import {Error404Page} from './app/modules/404-page';
import {Error500Page} from './app/modules/500-page';
import {UserPage} from './app/modules/user-page';
import {TestMediumDraftPage} from './app/modules/TestMediumDraft-page';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={`${virtualPath}/404`} component={Error404Page}/>
    <Route path={`${virtualPath}/500`} component={Error500Page}/>
    <Route path={`${virtualPath}/test-md`} component={TestMediumDraftPage}/>

    <Route path={`${virtualPath}/`} component={Index}>
      <Route path={`${virtualPath}/post-grid`} component={PostGrid}/>
      <Route path={`${virtualPath}/my-profile`} component={EditProfilePage}/>
      <Route path={`${virtualPath}/manage-event`} component={EventManager}/>
      <Route path={`${virtualPath}/user/:id`} component={UserPage}/>
      <Route path={`${virtualPath}/event/:id`} component={EventDetailPage}>
        <Route path={`${virtualPath}/event/:id/wall`} component={EventDetailWallComponent}/>
        <Route path={`${virtualPath}/event/:id/description`} component={EventDetailDescriptionComponent}/>
        <Route path={`${virtualPath}/event/:id/people`} component={EventDetailPeopleComponent}/>
        <Route path={`${virtualPath}/event/:id/photos`} component={EventDetailPhotosComponent}/>
        <IndexRoute component={EventDetailWallComponent}/>
      </Route>
      <IndexRoute component={PostGrid}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
