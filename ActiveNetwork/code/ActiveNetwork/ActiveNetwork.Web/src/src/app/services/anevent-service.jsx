import {ServiceBase} from './ServiceBase';

class ANEventService extends ServiceBase {
  async uploadCoverPhoto(model) {
    let url = '/anevent/upload-cover-photo';
    let image = model.cover;
    return await super.executeFetchPostImage(url, image);
  }

  async createANEvent(model) {
    let url = '/anevent/create-event';
    let result = await super.executeFetchPost(url, model);
    return result;
  }

  async getAllCategories() {
    let url = '/anevent/get-all-categories';
    return await super.executeFetch(url);
  }

  async getANEvents() {
    let url = '/anevent/get-events';
    return await super.executeFetch(url);
  }

  async getNewFeeds() {
    let url = 'anevent/get-new-feeds';
    return await super.executeFetch(url);
  }

  async getANEventsByHost(hostid) {
    let url = '/anevent/get-events-by-host?hostid=' + hostid;
    return await super.executeFetch(url);
  }

  async getJoinedANEvents(hostid) {
    let url = '/anevent/get-joined-events?hostid=' + hostid;
    return await super.executeFetch(url);
  }

  async getANEventsForNewFeed() {
    let newFeeds = await this.getNewFeeds();
    let entities = newFeeds.ANEvents;
    let serverDateTimeNow = newFeeds.ServerDateTimeNow;
    return {
      posts: entities.map(anEvent => {
        anEvent.IsFavorited = anEvent.ANEventUserFavourites.length > 0;
        anEvent.Host = anEvent.Host || {Id: 0, CreatedDate: new Date()};
        anEvent.Host.Profile = anEvent.Host.Profile || {FirstName: '', LastName: '', MiddleName: ''};
        anEvent.Host.Profile.Avatar = anEvent.Host.Profile.Avatar || {Id: 0, Url: ''};
        anEvent.CoverPhoto = anEvent.CoverPhoto || {Id: 0, Url: ''};
        anEvent.Information = anEvent.Information || {
            Id: 0,
            Location: '',
            Description: '',
            ShortDescription: '',
            Title: '',
            EndDate: new Date()
          };
        return {
          anevent_id: anEvent.Id,
          host_name: `${`${anEvent.Host.Profile.LastName} ${anEvent.Host.Profile.MiddleName}`.trim()} ${anEvent.Host.Profile.FirstName}`.trim(),
          host_avatar: anEvent.Host.Profile.Avatar.Url,
          cover_image: anEvent.CoverPhoto.Url,
          event_createdDate: anEvent.CreatedDate,
          title: anEvent.Information.Title,
          description: anEvent.Information.Description,
          shortDescription: anEvent.Information.ShortDescription,
          isFavorited: anEvent.IsFavorited
        };
      }),
      serverDateTimeNow: serverDateTimeNow
    };
  }

  async joinANEvents(eventId, userId) {
    let url = '/anevent/join-event';
    return await super.executeFetchPost(url, {Id: 0, EventId: eventId, UserId: userId});
  }

  async approveJoinEvent(RTJId) {
    let url = '/anevent/approve-join-event';
    let result = await super.executeFetchPost(url, RTJId);
    return result ? true : false;
  }

  async denyJoinEvent(RTJId) {
    let url = '/anevent/deny-join-event';
    let result = await super.executeFetchPost(url, RTJId);
    return result ? true : false;
  }

  async addEventToFavourites(model) {
    let url = '/anevent/add-event-to-favourites';
    let request = {ANEventId: model.anEventId};
    return await super.executeFetchPost(url, request);
  }

  async removeEventFromFavourites(model) {
    let url = '/anevent/remove-event-from-favourites';
    let request = {ANEventId: model.anEventId};
    return await super.executeFetchPost(url, request);
  }

  async getMyFavouriteEvents() {
    let url = '/anevent/get-my-favourite-events';
    return await super.executeFetch(url);
  }
}

let ANEventServiceInstance = new ANEventService();
export {ANEventServiceInstance};