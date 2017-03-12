import {ServiceBase} from './ServiceBase';

class UserProfileService extends ServiceBase {
  async getUserProfile(userId){
    let url = 'http://localhost:4378/' + 'get-user-profile?UserID=' + userId;
    let result = await super.executeFetch(url);
    return result;
  }
}

let UserProfileServiceInstance = new UserProfileService();
export {UserProfileServiceInstance};