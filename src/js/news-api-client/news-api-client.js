import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class NewsApiClient {
  constructor({
    apiKey, language, pageSize, httpClient,
  }) {
    this._apiKey = apiKey;
    this._pageSize = pageSize || 100;
    this._language = language;

    if (httpClient === undefined) {
      this._httpClient = HttpClient.create();
    } else {
      this._httpClient = httpClient;
    }

    this._httpClient
      .setBaseUrl(NewsApiClient.NEWSAPI_URL)
      .setResponseFormat(HttpClient.RESPONSE_JSON)
      .setMode(HttpRequest.MODE_CORS)
      .setCache(HttpRequest.CACHE_NO_CACHE);
  }

  static create(props) {
    return new NewsApiClient(props);
  }

  static get RESULT_STATUS_OK() {
    return 'ok';
  }

  static get NEWSAPI_URL() {
    return 'https://newsapi.org/v2';
  }

  search(searchText, language, fromDate, toDate) {
    let reqFromDate = fromDate;
    let reqToDate = toDate;
    const sysdate = new Date();

    if (reqFromDate === undefined) {
      reqFromDate = new Date();
      reqFromDate.setDate(sysdate.getDate() - 7);
    }

    if (reqToDate === undefined) {
      reqToDate = sysdate;
    }

    const queryParams = {
      apiKey: this._apiKey,
      q: searchText,
      sortBy: 'publishedAt',
      pageSize: this._pageSize,
      from: NewsApiClient.formatDate(reqFromDate),
      to: NewsApiClient.formatDate(reqToDate),
      language: language || this._language || 'en',
    };

    return this._httpClient.fetch('/everything', { queryParams });
  }

  static formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
