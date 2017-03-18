import {ServiceBase} from './ServiceBase';

class ANEventService extends ServiceBase {
  async uploadCoverPhoto(model){
    let url = '/anevent/upload-cover-photo';
    let image = model.cover;
    return await super.executeFetchPostImage(url,image);
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

  async getANEventsForNewFeed() {
    let entities = await this.getANEvents();
    return entities.map(x => {
      x.Host = x.Host || {Id: 0};
      x.Host.Profile = x.Host.Profile || {FirstName: '', LastName: '', MiddleName: ''};
      x.Host.Profile.Avatar = x.Host.Profile.Avatar || {Id: 0, Url: ''};
      x.CoverPhoto = x.CoverPhoto || {Id: 0, Url: ''};
      x.Information = x.Information || {
          Id: 0,
          Location: '',
          Description: '',
          Title: '',
          CreateDate: new Date(),
          EndDate: new Date()
        };
      return {
        anevent_id: x.Id,
        host_name: `${`${x.Host.Profile.LastName} ${x.Host.Profile.MiddleName}`.trim()} ${x.Host.Profile.FirstName}`.trim(),
        host_avatar: x.Host.Profile.Avatar.Url,
        cover_image: x.CoverPhoto.Url,
        title: x.Information.Title,
        description: x.Information.Description,
      };
    });
  }

  async joinANEvents(eventId, userId) {
    let url = '/anevent/join-event';
    return await super.executeFetchPost(url, {Id: 0, EventId: eventId, UserId: userId});
  }
}

let ANEventServiceInstance = new ANEventService();
export {ANEventServiceInstance};