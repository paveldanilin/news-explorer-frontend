export default class Page {
  static getName() {
    return window.location.pathname.split('/').pop();
  }
}
