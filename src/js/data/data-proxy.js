import Observable from '../component/observable';
import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class DataProxy extends Observable {
  constructor(props) {
    super();

    const {
      url, method, headers, queryParams, listeners,
    } = props;

    this._url = url || null;
    this._method = (method || 'GET').toUpperCase();
    this._headers = headers || null;
    this._queryParams = queryParams || null;
    this._httpClient = null;

    const eventListeners = listeners || [];
    Object
      .keys(eventListeners)
      .forEach((eventName) => this.on(eventName, eventListeners[eventName]));
  }

  static create(props) {
    return new DataProxy(props);
  }

  load(url, queryParams) {
    this.fireEvent('beforeload', { url: url || this._url, method: this._method, queryParams: queryParams || this._queryParams });
    switch (this._method) {
      case 'GET':
        this.getHttpClient()
          .fetch(
            url || this._url,
            { headers: this._headers, queryParams: queryParams || this._queryParams },
          )
          .then((response) => {
            this.fireEvent('load', response);
          }).catch((error) => {
            this.fireEvent('error', error);
          });
        return;

      case 'POST':
        this.getHttpClient()
          .post(
            url || this._url,
            { headers: this._headers, queryParams: queryParams || this._queryParams },
          )
          .then((response) => {
            this.fireEvent('load', response);
          }).catch((error) => {
            this.fireEvent('error', error);
          });
        return;

      default:
        throw new Error(`DataProxy does not supper method "${this._method}" for data request`);
    }
  }

  getHttpClient() {
    if (this._httpClient === null) {
      this._httpClient = HttpClient.create({
        responseFormat: HttpClient.RESPONSE_JSON,
        mode: HttpRequest.MODE_CORS,
        cache: HttpRequest.CACHE_NO_CACHE,
      });
    }
    return this._httpClient;
  }
}
