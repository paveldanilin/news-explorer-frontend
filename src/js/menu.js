import Menu from './component/menu/menu';
import Button from './component/form/button/button';
import Dialog from '../components/dialog/dialog';
import IconButton from './component/form/button/icon-button';
import User from './user/user';
import Component from './component/component';
import Page from './util/page';
import { watch } from './component/event-bus';

let userName = User.getName();

function onUserLogged() {
  userName = User.getName();

  if (Component.get('desktopMenu').isHidden() === false) {
    // Articles
    Component.get('desktopMenu')
      .getItem(3)
      .show();
    // Authorize
    Component.get('desktopMenu')
      .getItem(4)
      .hide();
    // Exit
    Component.get('desktopMenu')
      .getItem(5)
      .show();
  }


  if (Component.get('mobileMenu').isHidden() === false) {
    // Mob - auth
    Component.get('mobileMenu')
      .getItem(3)
      .hide();
    // Mob - exit
    Component.get('mobileMenu')
      .getItem(4)
      .show();
    // Mob - Articles
    Component.get('mobileMenu')
      .getItem(2)
      .show();
  }
}

function onUserLogout() {
  userName = null;

  if (Component.get('desktopMenu').isHidden() === false) {
    // Articles
    Component.get('desktopMenu')
      .getItem(3)
      .hide();
    // Authorize
    Component.get('desktopMenu')
      .getItem(4)
      .show();
    // Exit
    Component.get('desktopMenu')
      .getItem(5)
      .hide();
  }

  if (Component.get('mobileMenu').isHidden() === false) {
    // Mob - exit
    Component.get('mobileMenu')
      .getItem(4)
      .hide();
    // Mob - auth
    Component.get('mobileMenu')
      .getItem(3)
      .show();
    // Mob - Articles
    Component.get('mobileMenu')
      .getItem(2)
      .hide();
  }
}

/**
 * Desktop menu
 */
Menu.create({
  id: 'desktopMenu',
  container: '#mainMenuDesktop',
  classList: ['header__desktop-menu', 'nav'],
  itemSelectedClass: 'nav__item_selected',
  itemClassList: ['nav__item'],
  items: [
    {
      id: 'logoMenuItem',
      link: 'index.html',
      text: 'NewsExplorer',
      classList: ['logo', 'logo_light'],
    },
    {
      id: 'homeMenuItem',
      link: 'index.html',
      text: 'Главная',
      selected: Page.getName() === 'index.html',
      classList: ['nav__item_pull-right'],
    },
    {
      id: 'aboutMenuItem',
      link: 'about.html',
      text: 'О проекте',
      selected: Page.getName() === 'about.html',
      classList: ['nav__item_style_smoke'],
    },
    {
      id: 'articlesMenuItem',
      link: 'articles.html',
      text: 'Сохраненные статьи',
      selected: Page.getName() === 'articles.html',
      classList: ['nav__item_style_smoke'],
      hidden: userName === null,
    },
    {
      id: 'loginMenuItem',
      hidden: userName !== null,
      renderer: () => Button.create({
        id: 'authButton',
        text: 'Авторизоваться',
        classList: ['btn', 'btn_rad_80', 'btn_brd_1', 'btn_size_s', 'btn_transparent'],
        listeners: {
          click: () => Dialog.show('dialog_signin'),
          afterrender: (event) => {
            const btn = event.component;
            switch (Page.getName()) {
              default:
              case 'index.html':
                btn.HtmlElement.classList.add('btn_style_snow');
                break;
              case 'articles.html':
              case 'about.html':
                btn.HtmlElement.classList.add('btn_style_light');
                break;
            }
          },
        },
      }),
    },
    {
      id: 'logoutMenuItem',
      hidden: userName === null,
      renderer: () => IconButton.create({
        id: 'logoutButton',
        text: 'Выход',
        textAlign: IconButton.TEXT_ALIGN_LEFT,
        iconClassList: ['icon', 'icon_size_24'],
        classList: ['btn', 'btn_rad_80', 'btn_brd_1', 'btn_size_s', 'btn_transparent'],
        listeners: {
          click: () => User.logout(),
          afterrender: (event) => {
            const btn = event.component;
            btn.setText(userName);
            switch (Page.getName()) {
              default:
              case 'index.html':
                // btn.HtmlElement.classList.add('icon_logout_white');
                btn.HtmlElement.classList.add('btn_style_snow');
                btn.IconHtmlElement.classList.add('icon_logout_white');
                break;
              case 'articles.html':
              case 'about.html':
                // btn.HtmlElement.classList.add('icon_logout_black');
                btn.HtmlElement.classList.add('btn_style_light');
                btn.IconHtmlElement.classList.add('icon_logout_black');
                break;
            }
          },
        },
      }),
    },
    {
      id: 'menuToggleButton',
      classList: ['header__mobile-toggle'],
      renderer: () => IconButton.create({
        classList: ['btn_brd_none'],
        iconClassList: ['icon', 'icon_size_24'],
        listeners: {
          click: (event) => {
            const btn = event.component;
            const logo = Component.get('logoMenuItem');

            Component.get('mobileMenu').toggle();
            Component.get('desktopMenu')
              .HtmlElement.classList.toggle('header__desktop-menu_bg-color_dark');

            if (Page.getName() === 'articles.html' || Page.getName() === 'about.html') {
              if (btn.HtmlElement.classList.contains('icon_menu_black')) {
                btn.HtmlElement.classList.remove('icon_menu_black');
                btn.HtmlElement.classList.add('icon_menu_white');
                logo.HtmlElement.classList.remove('nav__item_style_dark');
                logo.HtmlElement.classList.add('nav__item_style_light');
              } else {
                btn.HtmlElement.classList.add('icon_menu_black');
                btn.HtmlElement.classList.remove('icon_menu_white');
                logo.HtmlElement.classList.add('nav__item_style_dark');
                logo.HtmlElement.classList.remove('nav__item_style_light');
              }
            }
          },
          afterrender: (event) => {
            const btn = event.component;
            switch (Page.getName()) {
              default:
              case 'index.html':
                btn.HtmlElement.classList.add('icon_menu_white');
                break;
              case 'articles.html':
              case 'about.html':
                btn.HtmlElement.classList.add('icon_menu_black');
                break;
            }
          },
        },
      }),
    },
  ],
  listeners: {
    afterrender: (event) => {
      const menu = event.component;
      switch (Page.getName()) {
        default:
        case 'index.html':
          menu.HtmlElement.classList.add('header__desktop-menu_separator_light');
          menu.findById('logoMenuItem').HtmlElement.classList.add('nav__item_style_light');
          menu.findById('homeMenuItem').HtmlElement.classList.add('nav__item_style_light');
          break;
        case 'about.html':
          menu.HtmlElement.classList.add('header__desktop-menu_separator_dark');
          menu.findById('logoMenuItem').HtmlElement.classList.add('nav__item_style_dark');
          menu.findById('homeMenuItem').HtmlElement.classList.add('nav__item_style_smoke');
          menu.findById('aboutMenuItem').HtmlElement.classList.add('nav__item_style_dark');
          break;
        case 'articles.html':
          menu.HtmlElement.classList.add('header__desktop-menu_separator_dark');
          menu.findById('logoMenuItem').HtmlElement.classList.add('nav__item_style_dark');
          menu.findById('homeMenuItem').HtmlElement.classList.add('nav__item_style_smoke');
          menu.findById('aboutMenuItem').HtmlElement.classList.add('nav__item_style_smoke');
          menu.findById('articlesMenuItem').HtmlElement.classList.add('nav__item_style_dark');
          break;
      }
    },
  },
});

/**
 * Mobile menu
 */
Menu.create({
  id: 'mobileMenu',
  container: '#mainMenuMobile',
  hidden: true,
  classList: ['header__mobile-menu', 'nav', 'nav_vert', 'nav_position_absolute'],
  itemClassList: ['nav__item', 'nav__item_style_light'],
  items: [
    {
      link: 'index.html',
      text: 'Главная',
    },
    {
      link: 'about.html',
      text: 'О проекте',
    },
    {
      id: 'mobileMenu_articlesMenuItem',
      link: 'articles.html',
      text: 'Сохраненные статьи',
      placeholderTag: 'li',
      hidden: userName === null,
    },
    {
      id: 'mobileMenu_loginMenuItem',
      hidden: userName !== null,
      placeholderTag: 'li',
      renderer: () => Button.create({
        text: 'Авторизоваться',
        classList: [
          'btn',
          'btn_rad_80',
          'btn_brd_1',
          'btn_style_snow',
          'btn_size_s',
          'btn_transparent',
        ],
        listeners: { click: () => Dialog.show('dialog_signin') },
      }),
    },
    {
      id: 'mobileMenu_logoutMenuItem',
      hidden: userName === null,
      placeholderTag: 'li',
      renderer: () => Button.create({
        text: 'Выход  ',
        classList: [
          'btn',
          'btn_rad_80',
          'btn_brd_1',
          'btn_style_snow',
          'btn_size_s',
          'btn_transparent',
        ],
        listeners: { click: () => User.logout() },
      }),
    },
  ],
  listeners: {
    afterrender: (event) => {
      const menu = event.component;
      if (userName === null) {
        // Mob - auth
        menu.getItem(3).show();
        // Mob - exit
        menu.getItem(4).hide();
        // Mob - articles
        menu.getItem(2).hide();
      } else {
        // Mob - auth
        menu.getItem(3).hide();
        // Mob - exit
        menu.getItem(4).show();
        // Mob - articles
        menu.getItem(2).show();
      }
    },
  },
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    Component.get('mobileMenu').hide();
    Component.get('desktopMenu')
      .HtmlElement.classList.remove('header__desktop-menu_bg-color_dark');
  }
});

watch(User.EVENT_USER_SIGNIN, onUserLogged);
watch(User.EVENT_USER_LOGOUT, onUserLogout);
