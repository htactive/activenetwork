import {ServiceBase} from './ServiceBase';
import {userStore} from '../store/user-store';

class UserProfileService extends ServiceBase {
  async getUserProfile(userId){
    let url = '/anprofile/get-user-profile?id=' + userId;
    return await super.executeFetch(url);
  }

  async createUserProfile(userProfile){
    let url = '/anprofile/create-user-profile';
    let result = await super.executeFetchPost(url, userProfile);
    return result;
  }

  async updateUserProfile(userProfile){
    let url = '/anprofile/update-user-profile';
    let result = await super.executeFetchPost(url, userProfile);
    return result;
  }
  async getMyProfile(){
    let url = '/anprofile/get-my-profile';
    return await super.executeFetch(url);
  }
  async updateMyProfile(model){
    let url = '/anprofile/update-my-profile';
    let updateData = {};
    return await super.executeFetchPost(url,updateData);
  }
}

let UserProfileServiceInstance = new UserProfileService();
export {UserProfileServiceInstance};