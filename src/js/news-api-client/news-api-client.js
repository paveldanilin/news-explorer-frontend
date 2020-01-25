import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class NewsApiClient {
  constructor(apiKey, language, pageSize) {
    this.apiKey = apiKey;
    this.pageSize = pageSize || 100;
    this.language = language;
    this.httpClient = HttpClient.create({
      baseUrl: 'https://newsapi.org/v2',
      responseFormat: HttpClient.RESPONSE_JSON,
      mode: HttpRequest.MODE_CORS,
      cache: HttpRequest.CACHE_NO_CACHE,
    });
  }

  static create(props) {
    const { apiKey, language, pageSize } = props;
    return new NewsApiClient(apiKey, language, pageSize);
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

    const queryParams = {
      apiKey: this.apiKey,
      q: searchText,
      sortBy: 'publishedAt',
      pageSize: this.pageSize,
      from: NewsApiClient.formatDate(reqFromDate),
      to: NewsApiClient.formatDate(reqToDate),
      language: language || this.language || 'en',
    };

    return this.httpClient.fetch('/everything', { queryParams });
  }

  static formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
