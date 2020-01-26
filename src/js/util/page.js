export default class Page {
  static getName() {
    return window.location.pathname.split('/').pop();
  }

  static redirect(url) {
    window.location.replace(url);
  }
}
