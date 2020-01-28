import HttpError from './http-error';

export default class HttpRequestError extends HttpError {
  constructor(request, response, error) {
    super(`[${request.method}] -> ${request.url}`);
    this._response = response;
    this._request = request;
    this._error = error;
  }

  get Response() {
    return this._response;
  }

  get Request() {
    return this._request;
  }

  get Error() {
    return this._error;
  }

  get status() {
    if (this._response) {
      return this._response.status;
    }
    return 0;
  }
}
