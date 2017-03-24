import {ServiceBase} from './ServiceBase';

class CommonService extends ServiceBase {
  async getAllGenders() {
    let url = '/gender/get-all-genders';
    return await super.executeFetch(url);
  }
  async uploadImage(model){
    let url = '/image/upload-new-image';
    let image = model.image;
    return await super.executeFetchPostImage(url,image);
  }
}

let CommonServiceInstance = new CommonService();
export {CommonServiceInstance};