import BackendApiClient from '../backend-api-client/backend-api-client';
import Config from '../config';
import Dialog from '../../components/dialog/dialog';
import { notify } from '../component/event-bus';
import MsgBox from '../component/msg-box/msg-box';
import HttpClient from '../http-client/http-client';
import HttpRequestError from '../http-client/http-request-error';

/**
 * @type {BackendApiClient}
 */
const backendApiClient = new BackendApiClient({
  host: Config.BACKEND_API_HOST,
  httpClient: HttpClient.create(),
});

export default class User {
  static signInForm(form) {
    const inputEmail = form.querySelector('#signin_email');
    const inputPassword = form.querySelector('#signin_password');

    backendApiClient
      .signin(inputEmail.value, inputPassword.value)
      .then((response) => {
        backendApiClient.getUserInfo(response.token).then((userInfo) => {
          User.login({ ...userInfo, token: response.token });
          Dialog.close('dialog_signin');
        });
      })
      .catch((error) => {
        if (error instanceof HttpRequestError) {
          MsgBox.error('Ошибка авторизации');
        } else {
          error.Response.json().then((errorBody) => {
            Dialog.show('dialog_error', errorBody.message.replace(/&quot;/g, '"'));
          });
        }
      });
  }

  static signUpForm(form) {
    const inputEmail = form.querySelector('#signup_email');
    const inputPassword = form.querySelector('#signup_password');
    const inputName = form.querySelector('#signup_name');

    backendApiClient
      .signup(inputName.value, inputEmail.value, inputPassword.value)
      .then(() => {
        Dialog.close('dialog_signup');
        MsgBox.msg('Пользователь успешно зарегистрирован');
      })
      .catch((error) => {
        if (error instanceof HttpRequestError) {
          MsgBox.error('Ошибка регистрации');
        } else {
          error.Response.json().then((errorBody) => {
            Dialog.show('dialog_error', errorBody.message.replace(/&quot;/g, '"'));
          });
        }
      });
  }

  static logout() {
    window.localStorage.removeItem('user.token');
    window.localStorage.removeItem('user.name');
    window.localStorage.removeItem('user.email');
    notify('USER_LOGOUT');
  }

  static login({ name, email, token }) {
    window.localStorage.setItem('user.token', token);
    window.localStorage.setItem('user.name', name);
    window.localStorage.setItem('user.email', email);
    notify('USER_SIGNIN', { name, email, token });
  }

  static getName() {
    return window.localStorage.getItem('user.name');
  }

  static getEmail() {
    return window.localStorage.getItem('user.email');
  }

  static getToken() {
    return window.localStorage.getItem('user.token');
  }
}
