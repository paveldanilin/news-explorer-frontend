import HttpError from './http-error';

export default class HttpRequestError extends HttpError {
  constructor(request, response) {
    super(`[${request.method}] : ${response.status} -> ${request.url}`);
    this.response = response;
    this.request = request;
  }
}
