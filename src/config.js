export default class Config {
  static get NEWS_API_TOKEN() {
    return '43d52ebfb7ed449986028b50cbcee7c7';
  }

  static get NEWS_API_LANGUAGE() {
    return 'ru';
  }

  static get ERROR_TXT_NO_BLANK_ALLOWED() {
    return 'Нужно ввести ключевое слово';
  }

  static get ERROR_TXT_REQUEST_NOT_COMPLETED() {
    return `Во время запроса произошла ошибка.
    Возможно, проблема с соединением или сервер недоступен.
    Подождите немного и попробуйте ещё раз`;
  }
}
