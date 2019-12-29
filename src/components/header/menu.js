import Dialog from '../dialog/dialog';
import Nav from '../nav/nav';

const mainMenuElement = document.querySelector('[data-main-menu]');
const mobileMenuElement = document.querySelector('[data-mobile-menu]');

export default class Menu {
  showSigninDialog() {
    Dialog.show('dialog_signin');
  }

  toggleMobileMenu(inverseColors) {
    Nav.toggle(mobileMenuElement);
    mainMenuElement.classList.toggle('header__desktop-menu_bg-color_dark');

    if (inverseColors === true) {
      const logoElement = mainMenuElement.querySelector('.logo');

      // Bottom line
      if (mainMenuElement.classList.contains('header__desktop-menu_separator_dark')) {
        mainMenuElement.classList.remove('header__desktop-menu_separator_dark');
        mainMenuElement.classList.add('header__desktop-menu_separator_light');

        if (logoElement) {
          if (logoElement.classList.contains('nav__item_style_dark')) {
            logoElement.classList.remove('nav__item_style_dark');
            logoElement.classList.add('nav__item_style_light');
          }
        }
      } else {
        mainMenuElement.classList.remove('header__desktop-menu_separator_light');
        mainMenuElement.classList.add('header__desktop-menu_separator_dark');

        if (logoElement) {
          if (logoElement.classList.contains('nav__item_style_light')) {
            logoElement.classList.add('nav__item_style_dark');
            logoElement.classList.remove('nav__item_style_light');
          }
        }
      }

      // Logo
    }
  }

  onSigninHandler() {
    this.showSigninDialog();
    Nav.toggle(mobileMenuElement);
    mainMenuElement.classList.toggle('header__desktop-menu_bg-color_dark');
  }

}
