import {ServiceBase} from './ServiceBase';

class ANEventService extends ServiceBase {
  async getAllCategories(){
    let url = '/anevent/get-all-categories';
    return await super.executeFetch(url);
  }
  async getANEvents(){
    let url = '/anevent/get-events';
    return await
      super.executeFetch(url);
  }
}

let ANEventServiceInstance = new ANEventService();
export {ANEventServiceInstance};