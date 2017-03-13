import {ServiceBase} from './ServiceBase';

class UserService extends ServiceBase {
  async login(username, password, remember) {
    let url = '/user/login';
    return await super.executeFetchPost(url, {Username: username, Password: password, IsRememberMe: remember});
  }

  async registerNewUser(model) {
    let url = '/user/register';
    let request = {
      Username: model.email,
      FirstName: model.firstName,
      LastName: model.lastName,
      MiddleName: model.middleName,
      Password: model.password
    };
    return await super.executeFetchPost(url, request);
  }
}

let UserServiceInstance = new UserService();
export {UserServiceInstance};