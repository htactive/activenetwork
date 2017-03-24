import {ServiceBase} from './ServiceBase';

class UserProfileService extends ServiceBase {
  async getUserProfile(userId) {
    let url = '/anprofile/get-user-profile?id=' + userId;
    let result = await super.executeFetch(url);
    return {
      Id : result.Id,
      FirstName : result.FirstName,
      LastName : result.LastName,
      MiddleName : result.MiddleName,
      BirthDate : result.BirthDate,
      Gender : result.Gender,
      Email : result.Email,
      Phone : result.Phone,
      Address : result.Address,
      User : result.User,
      Avatar : result.Avatar,
      Introduction : result.Introduction,
      FullName: `${`${result.LastName} ${result.MiddleName}`.trim()} ${result.FirstName}`.trim(),
    };
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