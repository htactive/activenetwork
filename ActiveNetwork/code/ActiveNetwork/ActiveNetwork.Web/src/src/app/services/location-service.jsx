import {ServiceBase} from './ServiceBase';

class GoogleAPIService extends ServiceBase {

  async searchPlaces(address) {
    let url = '/google-api/search-places?search='+address;
    return await super.executeFetch(url);
  }
}

let GoogleAPIServiceInstance = new GoogleAPIService();
export {GoogleAPIServiceInstance};