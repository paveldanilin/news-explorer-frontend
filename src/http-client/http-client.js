import HttpRequest from './http-request';
import HttpError from './http-error';
import HttpRequestError from './http-request-error';

export default class HttpClient {
  constructor({
    baseUrl, headers, mode, cache, redirect, credentials, throwError, responseFormat,
  } = {}) {
    this.baseUrl = HttpClient.filterOptionBaseUrl(baseUrl || '');
    this.headers = headers || {};
    this.mode = mode || HttpRequest.MODE_SAME_ORIGIN;
    this.cache = cache || HttpRequest.CACHE_DEFAULT;
    this.redirect = redirect || HttpRequest.REDIRECT_FOLLOW;
    this.credentials = credentials || HttpRequest.CREDENTIALS_SAME_ORIGIN;
    this.throwError = throwError || true;
    this.responseFormat = HttpClient.filterOptionResponseFormat(responseFormat || undefined);
  }

  static get RESPONSE_JSON() {
    return 'json';
  }

  static get RESPONSE_TEXT() {
    return 'text';
  }

  static get RESPONSE_FORM_DATA() {
    return 'form-data';
  }

  static get RESPONSE_BLOB() {
    return 'blob';
  }

  static get RESPONSE_ARRAY_BUFFER() {
    return 'array-buffer';
  }

  static get RESPONSE_RAW() {
    return 'raw';
  }

  static create(options) {
    return new HttpClient(options || {});
  }

  static getRequest(url, options) {
    return HttpClient.create().fetch(url, options);
  }

  static postRequest(url, options) {
    return HttpClient.create().post(url, options);
  }

  static patchRequest(url, options) {
    return HttpClient.create().patch(url, options);
  }

  static deleteRequest(url, options) {
    return HttpClient.create().delete(url, options);
  }

  fetch(url, {
    headers, mode, cache, redirect, credentials, responseFormat, queryParams,
  } = {}) {
    return this.sendRequest(
      url,
      HttpRequest.METHOD_GET,
      headers || undefined,
      undefined,
      mode || undefined,
      cache || undefined,
      redirect || undefined,
      credentials || undefined,
      responseFormat || undefined,
      queryParams || {},
    );
  }

  post(url, {
    headers, body, mode, cache, redirect, credentials, responseFormat, queryParams,
  } = {}) {
    return this.sendRequest(
      url,
      HttpRequest.METHOD_POST,
      headers || undefined,
      body || undefined,
      mode || undefined,
      cache || undefined,
      redirect || undefined,
      credentials || undefined,
      responseFormat || undefined,
      queryParams || {},
    );
  }

  patch(url, {
    headers, body, mode, cache, redirect, credentials, responseFormat, queryParams,
  } = {}) {
    return this.sendRequest(
      url,
      HttpRequest.METHOD_PATCH,
      headers || undefined,
      body || undefined,
      mode || undefined,
      cache || undefined,
      redirect || undefined,
      credentials || undefined,
      responseFormat || undefined,
      queryParams || {},
    );
  }

  put(url, {
    headers, body, mode, cache, redirect, credentials, responseFormat, queryParams,
  } = {}) {
    return this.sendRequest(
      url,
      HttpRequest.METHOD_PUT,
      headers || undefined,
      body || undefined,
      mode || undefined,
      cache || undefined,
      redirect || undefined,
      credentials || undefined,
      responseFormat || undefined,
      queryParams || {},
    );
  }

  delete(url, {
    headers, mode, cache, redirect, credentials, responseFormat, queryParams,
  } = {}) {
    return this.sendRequest(
      url,
      HttpRequest.METHOD_DELETE,
      headers || undefined,
      undefined,
      mode || undefined,
      cache || undefined,
      redirect || undefined,
      credentials || undefined,
      responseFormat || undefined,
      queryParams || {},
    );
  }

  async sendRequest(
    url,
    method,
    headers,
    body,
    mode,
    cache,
    redirect,
    credentials,
    responseFormat,
    params,
  ) {
    const reqHeaders = Object.assign(this.headers, headers || {});
    const reqMode = mode || this.mode;
    const reqCache = cache || this.cache;
    const reqRedirect = redirect || this.redirect;
    const reqCredentials = credentials || this.credentials;
    const reqResponseFormat = HttpClient.filterOptionResponseFormat(
      responseFormat,
      this.responseFormat,
    );
    let reqUrl = this.baseUrl.length > 0 ? this.baseUrl + url : url;

    if (params) {
      const queryParams = HttpClient.toParamsString(params);
      if (queryParams.length > 0) {
        reqUrl += `?${queryParams}`;
      }
    }

    const request = new Request(encodeURI(reqUrl), {
      method: HttpRequest.filterOptionMethod(method),
      body,
      headers: reqHeaders,
      mode: HttpRequest.filterOptionMode(reqMode),
      cache: HttpRequest.filterOptionCache(reqCache),
      redirect: HttpRequest.filterOptionRedirect(reqRedirect),
      credentials: HttpRequest.filterOptionCredentials(reqCredentials),
    });

    const response = await fetch(request);

    if (this.throwError === true && !response.ok) {
      throw new HttpRequestError(request, response);
    }

    if (response.ok) {
      switch (reqResponseFormat) {
        default:
        case HttpClient.RESPONSE_TEXT:
          return response.text();

        case HttpClient.RESPONSE_ARRAY_BUFFER:
          return response.arrayBuffer();

        case HttpClient.RESPONSE_BLOB:
          return response.blob();

        case HttpClient.RESPONSE_FORM_DATA:
          return response.formData();

        case HttpClient.RESPONSE_JSON:
          return response.json();
      }
    }

    return response;
  }

  static toParamsString(params) {
    if (typeof params !== 'object') {
      return '';
    }
    const str = Object
      .keys(params)
      .reduce((queryParams, val) => `${queryParams}&${val}=${params[val]}`, '');
    if (str.length > 0) {
      return str.substr(1);
    }
    return str;
  }

  static filterOptionResponseFormat(responseFormat, defaultFormat) {
    const format = (responseFormat || defaultFormat || HttpClient.RESPONSE_RAW).toLowerCase();

    const allowed = [
      HttpClient.RESPONSE_RAW,
      HttpClient.RESPONSE_JSON,
      HttpClient.RESPONSE_FORM_DATA,
      HttpClient.RESPONSE_BLOB,
      HttpClient.RESPONSE_ARRAY_BUFFER,
      HttpClient.RESPONSE_TEXT,
    ];

    if (!allowed.includes(format)) {
      throw new HttpError(`\`responseFormat\` option must have value one of [${allowed.join(',')}]`);
    }

    return format;
  }

  static filterOptionBaseUrl(baseUrl) {
    if (typeof baseUrl !== 'string') {
      throw new HttpError('`baseUrl` option must be non empty string');
    }

    return baseUrl.trim();
  }
}
