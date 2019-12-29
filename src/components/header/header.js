import './header.css';
import Dialog from '../dialog/dialog';
import Nav from '../nav/nav';

const mainMenuElement = document.querySelector('[data-main-menu]');
const mobileMenuElement = document.querySelector('[data-mobile-menu]');
let isMobileVisible = false;
let isColorInverse = false;

const showSigninDialog = () => {
  Dialog.show('dialog_signin');
};

const toggleMobileMenu = (inverseColors) => {
  const logoElement = mainMenuElement.querySelector('.logo');
  const mobileToggleBtn = mainMenuElement.querySelector('.header__mobile-toggle');
  const icon = mobileToggleBtn.querySelector('.icon');
  isColorInverse = inverseColors === true;
  Nav.toggle(mobileMenuElement);
  mainMenuElement.classList.toggle('header__desktop-menu_bg-color_dark');
  isMobileVisible = !isMobileVisible;

  if (inverseColors === true) {
    // TODO: лучше порсто переключать тему. громоздко вышло
    if (mainMenuElement.classList.contains('header__desktop-menu_bg-color_dark')) {
      // Bottom line
      mainMenuElement.classList.remove('header__desktop-menu_separator_dark');
      mainMenuElement.classList.add('header__desktop-menu_separator_light');

      // Logo
      if (logoElement) {
        logoElement.classList.remove('nav__item_style_dark');
        logoElement.classList.add('nav__item_style_light');
      }

      // Menu icon
      if (icon.classList.contains('icon_menu_black')) {
        icon.classList.remove('icon_menu_black');
        icon.classList.add('icon_close_white');
      }
    } else {
      mainMenuElement.classList.remove('header__desktop-menu_separator_light');
      mainMenuElement.classList.add('header__desktop-menu_separator_dark');

      if (logoElement) {
        logoElement.classList.add('nav__item_style_dark');
        logoElement.classList.remove('nav__item_style_light');
      }

      // Menu icon
      if (icon.classList.contains('icon_close_white')) {
        icon.classList.add('icon_menu_black');
        icon.classList.remove('icon_close_white');
      }
    }
  } else {
    if (isMobileVisible) {
      icon.classList.add('icon_close_white');
      icon.classList.remove('icon_menu_white');
    } else {
      icon.classList.add('icon_menu_white');
      icon.classList.remove('icon_close_white');
    }
  }
};

const onSigninHandler = (inverseColors) => {
  showSigninDialog();
  toggleMobileMenu(inverseColors);
};

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMobileVisible) {
    toggleMobileMenu(isColorInverse);
  }
});

export { showSigninDialog, toggleMobileMenu, onSigninHandler };
