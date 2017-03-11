import {ServiceBase} from './ServiceBase';

class ANEventService extends ServiceBase {
  async getAllTopics(){
    let url = '/anevent/get-all-topics';
    return await super.executeFetch(url);
  }
}

let ANEventServiceInstance = new ANEventService();
export {ANEventServiceInstance};