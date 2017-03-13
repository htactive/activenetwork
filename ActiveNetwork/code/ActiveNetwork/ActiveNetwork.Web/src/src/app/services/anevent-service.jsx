import {ServiceBase} from './ServiceBase';

class ANEventService extends ServiceBase {
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
}

let ANEventServiceInstance = new ANEventService();
export {ANEventServiceInstance};