import HttpClient from '../http-client/http-client';
import HttpRequest from '../http-client/http-request';

export default class GithubApiClient {
  constructor() {
    this.httpClient = HttpClient.create({
      baseUrl: 'https://api.github.com',
      responseFormat: HttpClient.RESPONSE_JSON,
      mode: HttpRequest.MODE_CORS,
      cache: HttpRequest.CACHE_NO_CACHE,
    });
  }

  // TODO: validate params
  // since: YYYY-MM-DDTHH:MM:SSZ
  getRepositoryCommits(owner, repo, since) {
    const path = `/repos/${owner}/${repo}/commits`;
    const queryParams = {};

    if (since) {
      queryParams.since = since;
    }

    return this.httpClient.fetch(path, { queryParams });
  }
}
