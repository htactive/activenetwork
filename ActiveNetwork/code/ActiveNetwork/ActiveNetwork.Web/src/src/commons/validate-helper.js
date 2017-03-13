export class Validation {

  static emailValidator(email) {
    if (email === undefined) return true;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static validateNull(data) {
    return this.validateLength(data,1);
  }

  static validateEmail(data) {
    return data == "" || this.emailValidator(data);
  }
  static validateLength(data,length){

    return (data + "").length >= length;
  }
}