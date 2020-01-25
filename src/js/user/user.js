import BackendApiClient from '../backend-api-client/backend-api-client';
import Config from '../config';
import Dialog from '../../components/dialog/dialog';
import { notify } from '../component/event-bus';
import MsgBox from '../component/msg-box/msg-box';

/**
 * @type {BackendApiClient}
 */
const backendApiClient = new BackendApiClient(Config.BACKEND_API_HOST);

export default class User {
  static signInForm(form) {
    const inputEmail = form.querySelector('#signin_email');
    const inputPassword = form.querySelector('#signin_password');

    backendApiClient
      .signin(inputEmail.value, inputPassword.value)
      .then((response) => {
        backendApiClient.getUserInfo(response.token).then((userInfo) => {
          window.localStorage.setItem('user.token', response.token);
          window.localStorage.setItem('user.name', userInfo.name);
          window.localStorage.setItem('user.email', userInfo.email);

          notify('USER_SIGNIN', userInfo);

          Dialog.close('dialog_signin');
        });
      })
      .catch((error) => {
        error.Response.json().then((errorBody) => {
          Dialog.show('dialog_error', errorBody.message.replace(/&quot;/g, '"'));
        });
      });
  }

  static signUpForm(form) {
    const inputEmail = form.querySelector('#signup_email');
    const inputPassword = form.querySelector('#signup_password');
    const inputName = form.querySelector('#signup_name');

    backendApiClient
      .signup(inputName.value, inputEmail.value, inputPassword.value)
      .then((response) => {
        console.log(response);
        Dialog.close('dialog_signup');
        MsgBox.msg('Пользователь успешно заркгистрирован');
      })
      .catch((error) => {
        error.Response.json().then((errorBody) => {
          Dialog.show('dialog_error', errorBody.message.replace(/&quot;/g, '"'));
        });
      });
  }

  static logout() {
    window.localStorage.removeItem('user.token');
    window.localStorage.removeItem('user.name');
    window.localStorage.removeItem('user.email');
    notify('USER_LOGOUT');
  }
}
