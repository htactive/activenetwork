import {ServiceBase} from './ServiceBase';
import {userStore} from '../store/user-store';

class UserProfileService extends ServiceBase {
  async getUserProfile(userId) {
    let url = '/anprofile/get-user-profile?id=' + userId;
    return await super.executeFetch(url);
  }

  async createUserProfile(userProfile) {
    let url = '/anprofile/create-user-profile';
    let result = await super.executeFetchPost(url, userProfile);
    return result;
  }

  async updateUserProfile(userProfile) {
    let url = '/anprofile/update-user-profile';
    let result = await super.executeFetchPost(url, userProfile);
    return result;
  }

  async getMyProfile() {
    let url = '/anprofile/get-my-profile';
    return await super.executeFetch(url);
  }

  async updateMyProfile(model) {
    let url = '/anprofile/update-my-profile';
    let updateData = {
      FirstName: model.firstName,
      LastName: model.lastName,
      MiddleName: model.middleName,
      BirthDate: model.birthDate,
      Gender: {Id: model.genderId},
      Email: model.email,
      Phone: model.phone,
      Address: model.address,
      Introduction:model.introduction
    };
    return await super.executeFetchPost(url, updateData);
  }

  async uploadUserAvatar(model){
    let url = '/anprofile/upload-my-avatar';
    let image = model.avatar;
    return await super.executeFetchPostImage(url,image);
  }
}

let UserProfileServiceInstance = new UserProfileService();
export {UserProfileServiceInstance};