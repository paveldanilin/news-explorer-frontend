import Observable from '../component/observable';
import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class DataProxy extends Observable {
  constructor(props) {
    super();

    const {
      url, method, headers, queryParams, listeners,
    } = props;

    this.url = url || null;
    this.method = (method || 'GET').toUpperCase();
    this.headers = headers || null;
    this.queryParams = queryParams || null;
    this.httpClient = null;

    const eventListeners = listeners || [];
    Object
      .keys(eventListeners)
      .forEach((eventName) => this.on(eventName, eventListeners[eventName]));
  }

  static create(props) {
    return new DataProxy(props);
  }

  load(url, queryParams) {
    this.fireEvent('beforeload', { url: url || this.url, method: this.method, queryParams: queryParams || this.queryParams });
    switch (this.method) {
      case 'GET':
        this.getHttpClient()
          .fetch(
            url || this.url,
            { headers: this.headers, queryParams: queryParams || this.queryParams },
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
            url || this.url,
            { headers: this.headers, queryParams: queryParams || this.queryParams },
          )
          .then((response) => {
            this.fireEvent('load', response);
          }).catch((error) => {
            this.fireEvent('error', error);
          });
        return;

      default:
        throw new Error(`DataProxy does not supper method "${this.method}" for data request`);
    }
  }

  getHttpClient() {
    if (this.httpClient === null) {
      this.httpClient = HttpClient.create({
        responseFormat: HttpClient.RESPONSE_JSON,
        mode: HttpRequest.MODE_CORS,
        cache: HttpRequest.CACHE_NO_CACHE,
      });
    }
    return this.httpClient;
  }
}
