import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class BackendApiClient {
  constructor({ host, httpClient }) {
    if (httpClient === undefined) {
      this._httpClient = HttpClient.create();
    } else {
      this._httpClient = httpClient;
    }

    this._httpClient
      .setBaseUrl(host)
      .setResponseFormat(HttpClient.RESPONSE_JSON)
      .setMode(HttpRequest.MODE_CORS)
      .setCache(HttpRequest.CACHE_NO_CACHE)
      .setHeaders({
        'Content-Type': 'application/json',
      });
  }

  signup(name, email, password) {
    return this._httpClient.post('/signup', {
      body: JSON.stringify({
        name, email, password,
      }),
    });
  }

  signin(email, password) {
    return this._httpClient.post('/signin', {
      body: JSON.stringify({
        email, password,
      }),
    });
  }

  getUserInfo(token) {
    return this._httpClient.fetch('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createArticle({
    keyword, title, text, date, source, link, image,
  }, token) {
    return this._httpClient.post('/articles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    });
  }

  removeArticle(id, token) {
    return this._httpClient.delete(`/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getArticles(token) {
    return this._httpClient.fetch('/articles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
