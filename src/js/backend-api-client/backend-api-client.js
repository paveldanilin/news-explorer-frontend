import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class BackendApiClient {
  constructor(host) {
    this.httpClient = HttpClient.create({
      baseUrl: `http://${host}`,
      responseFormat: HttpClient.RESPONSE_JSON,
      mode: HttpRequest.MODE_CORS,
      cache: HttpRequest.CACHE_NO_CACHE,
    });
  }

  signup(name, email, password) {
    return this.httpClient.post('/signup', { body: JSON.stringify({
        name, email, password,
      }) });
  }

  signin(email, password) {
    return this.httpClient.post('/signin', { body: JSON.stringify({
        email, password
      })});
  }

  getArticles(token) {
    return this.httpClient.fetch('/articles', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  createArticle({title, text, keyword, source, link, image} = {}) {

  }
}
