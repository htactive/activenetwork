import {ServiceBase} from './ServiceBase';

class UserProfileService extends ServiceBase {
  async getUserProfile(userId){
    let url = 'http://localhost:4378/' + 'anprofile/get-user-profile?id=' + userId;
    let result = await super.executeFetch(url);
    return result;
  }

  async createUserProfile(userProfile){
    let url = 'http://localhost:4378/' + 'anprofile/create-user-profile';
    let result = await super.executeFetchPost(url, userProfile);
    return result;
  }

  async updateUserProfile(userProfile){
    let url = 'http://localhost:4378/' + 'anprofile/update-user-profile';
    let result = await super.executeFetchPost(url, userProfile);
    return result;
  }
}

let UserProfileServiceInstance = new UserProfileService();
export {UserProfileServiceInstance};