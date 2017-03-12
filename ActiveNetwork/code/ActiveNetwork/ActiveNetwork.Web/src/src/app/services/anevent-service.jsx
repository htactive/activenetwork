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
      x.Host = x.Host || {Id: 0, UserProfiles: []};
      x.Host.Profile = x.Host.UserProfiles[0] || {FirstName: '', LastName: '', MiddleName: ''};
      x.Host.Profile.Avatar = x.Host.Profile.Avatar || {Id: 0, Url: ''};
      return {
        anevent_id: x.Id,
        host_name: `${`${x.Host.LastName} ${x.Host.MiddleName}`.trim()} ${x.Host.FirstName}`.trim(),
        host_avatar: x.Host.Profile.Avatar.Url,
        cover_image: '/img/Photos/2.jpg',
        title: 'Lorem ipsum dolor sit amet, copiosae appetere',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sollicitudin elit. Curabitur magna ligula, condimentum sed lacus nec, vulputate cursus sem. Sed a semper felis. Curabitur ligula enim, auctor eget rutrum a, convallis non diam. Vivamus ullamcorper aliquam purus, et euismod justo. Nulla',
        article_width: 0,
        article_top: 0,
        article_left: 0
      };
    });
  }
}

let ANEventServiceInstance = new ANEventService();
export {ANEventServiceInstance};