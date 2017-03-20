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
        Id: result.EventCoverPhoto.Id,
        Url: result.EventCoverPhoto.Url
      },
      IsHost: result.IsHost,
      IsPendingMember: result.IsPendingMember,
      IsMember: result.IsMember
    };
  }

  async getANEventDetailInformation(eventId) {
    let url = '/anevent-detail/get-event-detail-information?Id=' + eventId;
    let result = await super.executeFetch(url);

    return result;
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
}

let ANEventDetailServiceInstance = new ANEventDetailService();
export {ANEventDetailServiceInstance};