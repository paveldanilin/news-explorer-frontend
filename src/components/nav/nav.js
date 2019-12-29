import './nav.css';

export default class Nav {
  static toggle(target) {
    let el = null;
    if (typeof target === 'string') {
      el = document.getElementById(target);
    } else if (target instanceof HTMLElement) {
      el = target;
    }
    if (el) {
      el.classList.toggle('nav_visible_false');
    }
  }
}
