import './header.css';

import Menu from './menu';

const headerMenu = new Menu();

export default class Header {
  static getMenu() {
    return headerMenu;
  }
}
