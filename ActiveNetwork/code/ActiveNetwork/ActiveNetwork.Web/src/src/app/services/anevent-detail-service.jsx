import {ServiceBase} from './ServiceBase';

class ANEventDetailService extends ServiceBase {
  async getANEventDetail(eventId) {
    let url = '/anevent-detail/get-event-detail?Id=' + eventId;
    let result = await super.executeFetch(url);
    return result;
  }

  async getANEventDetailHeader(eventId) {
    let url = '/anevent-detail/get-event-detail-header?Id=' + eventId;
    let result = await super.executeFetch(url);
    return {
      EventID: result.EventID,
      EventTitle: result.EventTitle,
      EventCoverPhoto: {
        Id: (result.EventCoverPhoto || {Id: 0}).Id,
        Url: (result.EventCoverPhoto || {Url: "/img/cover/loading.jpg"}).Url
      },
      IsHost: result.IsHost,
      IsPendingMember: result.IsPendingMember,
      IsMember: result.IsMember
    };
  }

  async getANEventDetailInformation(eventId) {
    let url = '/anevent-detail/get-event-detail-information?Id=' + eventId;
    let result = await super.executeFetch(url);
    result.EventInformation = result.EventInformation || {};
    result.EventInformation.ANEventLocation = result.EventInformation.ANEventLocation || {};
    result.Host = result.Host || {Id: 0, Username: ''};
    result.Host.Profile = result.Host.Profile || {};
    return {
      EventID: result.EventID,
      EventInformation: {
        Id: result.EventInformation.Id,
        EventLocation: result.EventInformation.EventLocation,
        Description: result.EventInformation.Description,
        ShortDescription: result.EventInformation.ShortDescription,
        Title: result.EventInformation.Title,
        StartDate: result.EventInformation.StartDate,
        EndDate: result.EventInformation.EndDate,
        ANEventLocation: {
          Id: result.EventInformation.ANEventLocation.Id,
          GGId: result.EventInformation.ANEventLocation.GGId,
          Lat: result.EventInformation.ANEventLocation.Lat,
          Lng: result.EventInformation.ANEventLocation.Lng,
          Name: result.EventInformation.ANEventLocation.Name,
          Address: result.EventInformation.ANEventLocation.Address,
        }

      },
      Host: {
        Id: (result.Host || {Id: 0}).Id,
        Username: (result.Host || {Username: ''}).Username,
        Profile: result.Host.Profile
      }
    };
  }

  async getANEventDetailMember(eventId) {
    let url = '/anevent-detail/get-event-detail-member?Id=' + eventId;
    let result = await super.executeFetch(url);
    return result;
  }

  async getANEventDetailRequestToJoin(eventId) {
    let url = '/anevent-detail/get-event-detail-joiner?Id=' + eventId;
    let result = await super.executeFetch(url);
    return result;
  }

  async cancelMyRequestToJoin(eventId) {
    let url = '/anevent-detail/cancel-my-rtj';
    return await super.executeFetchPost(url, eventId);
  }

  async leaveEvent(eventId) {
    let url = '/anevent-detail/leave-event';
    return await super.executeFetchPost(url, eventId);
  }

  async getRelatedEvents(eventId) {
    let url = '/anevent-detail/get-related-events?eventId=' + eventId;
    let events = await super.executeFetch(url);
    return (events || []).map((ev, i) => {
      return {
        id: ev.Id,
        cover_image: ev.CoverPhoto != null ? ev.CoverPhoto.Url : '',
        day: moment(ev.CreatedDate).date(),
        start_day: ev.Information.StartDate ? moment(ev.Information.StartDate).format('DD [tháng] MM YYYY, [lúc] HH:mm') : '',
        title: ev.Information.Title,
        location: (ev.Information.ANEventLocation || {Address: ''}).Address,
      };
    });
  }

  async updateEventDescription(model) {
    let url = '/anevent-detail/update-event-description';
    let request = {
      ANEventId: model.eventId,
      Description: model.description
    };
    return await super.executeFetchPost(url, request) || false;
  }

  async updateEventTitle(model) {
    let url = '/anevent-detail/update-event-title';
    let request = {
      ANEventId: model.eventId,
      Title: model.title
    };
    return await super.executeFetchPost(url, request) || false;
  }
}

let ANEventDetailServiceInstance = new ANEventDetailService();
export {ANEventDetailServiceInstance};