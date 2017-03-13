import {ServiceBase} from './ServiceBase';

class ANEventDetailService extends ServiceBase {
  async getANEventDetail(eventId){
    let url = 'http://localhost:4378/' + 'anevent/get-event?id=' + eventId;
    let result = await super.executeFetch(url);
    return result;
  }


}

let ANEventDetailServiceInstance = new ANEventDetailService();
export {ANEventDetailServiceInstance};