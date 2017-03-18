import {ServiceBase} from './ServiceBase';

class CommonService extends ServiceBase {
  async getAllGenders() {
    let url = '/gender/get-all-genders';
    return await super.executeFetch(url);
  }

}

let CommonServiceInstance = new CommonService();
export {CommonServiceInstance};