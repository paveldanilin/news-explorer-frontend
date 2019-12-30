import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class NewsApiClient {
  constructor(apiKey, language, pageSize) {
    this.apiKey = apiKey;
    this.pageSize = pageSize || 100;
    this.language = language;
    this.httpClient = HttpClient.create({
      baseUrl: 'https://newsapi.org/v2/everything?',
      responseFormat: HttpClient.RESPONSE_JSON,
      mode: HttpRequest.MODE_CORS,
    });
  }

  static get RESULT_STATUS_OK() {
    return 'ok';
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

    const reqLanguage = language || this.language || 'en';

    const parameters = [
      `apiKey=${this.apiKey}`,
      `q=${searchText}`,
      'sortBy=publishedAt',
      `pageSize=${this.pageSize}`,
      `from=${NewsApiClient.formatDate(reqFromDate)}`,
      `to=${NewsApiClient.formatDate(reqToDate)}`,
      `language=${reqLanguage}`,
    ];

    return this.httpClient.fetch(parameters.join('&'));
  }

  static formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
