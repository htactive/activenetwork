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

  async getANEventsByHost() {
    let url = '/anevent/get-events-by-host';
    let events = await super.executeFetch(url);
    return this.groupEvents(events);
  }

  async getJoinedANEvents() {
    let url = '/anevent/get-joined-events';
    let events = await super.executeFetch(url);
    return this.groupEvents(events);
  }

  async getANEventsInWeek() {
    let url = '/anevent/get-events-in-week';
    let events = await super.executeFetch(url);
    return events.map(ev => {
      return {
        id: ev.Id,
        cover_image: ev.CoverPhoto != null ? ev.CoverPhoto.Url : '',
        day: ev.Day,
        start_day: ev.Information.StartDate ? moment(ev.Information.StartDate).format('DD [tháng] MM YYYY, [lúc] HH:mm') : '',
        title: ev.Information.Title,
        location: ev.Information.Location || '',
        description: ev.Information.Description,
        number_of_member: ev.NumberOfMember,
      }
    });
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
          isFavorited: anEvent.IsFavorited,
          host_id: anEvent.Host.Id,
        };
      }),
      serverDateTimeNow: serverDateTimeNow
    };
  }

  async joinANEvents(eventId, userId) {
    let url = '/anevent/join-event';
    return await super.executeFetchPost(url, eventId);
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
    let events = await super.executeFetch(url);
    return this.groupEvents(events);
  }

  groupEvents(events) {
    let g_years = groupby(events, function (a) {
      return moment(a.CreatedDate).year();
    });
    let results = [];
    for (let y_key in g_years) {
      let g_year = {};
      g_year.year = y_key;
      g_year.year_events = [];
      let g_months = groupby(g_years[y_key], function (b) {
        return (moment(b.CreatedDate).month() + 1);
      })
      for (let m_key in g_months) {
        let m_month = {};
        m_month.month = m_key;
        m_month.events = g_months[m_key].map(ev => {
          return {
            id: ev.Id,
            cover_image: ev.CoverPhoto != null ? ev.CoverPhoto.Url : '',
            day: moment(ev.CreatedDate).date(),
            start_day: ev.Information.StartDate ? moment(ev.Information.StartDate).format('DD [tháng] MM YYYY, [lúc] HH:mm') : '',
            title: ev.Information.Title,
            location: (ev.Information.ANEventLocation || {Address: ''}).Address,
            description: ev.Information.ShortDescription,
            number_of_member: ev.NumberOfMember,
          }
        });
        g_year.year_events.push(m_month);
      }
      g_year.year_events.sort(function (a, b) {
        return a.month - b.month > 0 ? -1 : (a.month == b.month ? 0 : 1);
      });
      results.push(g_year);

    }
    results.sort(function (a, b) {
      return a.year - b.year > 0 ? -1 : (a.year == b.year ? 0 : 1);
    })
    return results;
  }
}

let ANEventServiceInstance = new ANEventService();
export {ANEventServiceInstance};