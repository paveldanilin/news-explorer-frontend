import './images/favicon.png';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './components/theme.css';
import './components/styles.css';
import './components/components';
import resetForms from './components/form/form';
import User from './js/user/user';
import Dialog from './components/dialog/dialog';
import NewsApiClient from './js/news-api-client/news-api-client';
import Config from './js/config';
import Button from './js/component/form/button/button';
import Menu from './js/component/menu/menu';
import Component from './js/component/component';
import IconButton from './js/component/form/button/icon-button';
import ListView from './js/component/list-view/list-view';
import NewsCard from './js/component/news-card/news-card';
import TextField from './js/component/form/text-field/text-field';
import Element from './js/component/element';
import { watch } from './js/component/event-bus';
import MsgBox from './js/component/msg-box/msg-box';

/**
 * @type {NewsApiClient}
 */
const newsApiClient = new NewsApiClient(Config.NEWS_API_TOKEN, Config.NEWS_API_LANGUAGE);

/**
 * Cards grid
 */
ListView.create({
  id: 'cards',
  container: '#cardsGrid',
  classList: ['search-result__grid'],
  store: {
    recordDefinition: NewsCard.recordDefinition(),
    dataRoot: 'articles',
    pageSize: 3,
    pageMode: 'append',
  },
  itemRenderer: (record) => NewsCard.create({
    imageLink: record.get('imageLink'),
    createdAt: record.get('createdAt'),
    title: record.get('title'),
    contentText: record.get('contentText'),
    sourceLabel: record.get('sourceLabel'),
    sourceLink: record.get('sourceLink'),
  }),
});

/**
 * Show more news button
 */
Button.create({
  id: 'showMoreButton',
  container: '.search-result__container',
  text: 'Показать еще',
  classList: ['btn', 'btn_style_light', 'btn_size_m', 'btn_rad_100', 'btn_brd_none', 'search-result__btn-more'],
  listeners: {
    click: (event) => {
      const cardsGrid = Component.get('cards');
      cardsGrid.Store.nextPage();
      cardsGrid.refresh();
      if (cardsGrid.Store.getCurrentPage() === cardsGrid.Store.getPageCount()) {
        event.component.hide();
      }
    },
  },
});

/**
 * Sections: loading, noResult, result
 */
const loadingSection = Element.attach('#loading').hide();
const noresultSection = Element.attach('#noresult').hide();
const resultSection = Element.attach('#searchResult').hide();

/**
 * Handles search action
 * @param text {string}
 */
function searchNews(text) {
  const searchText = (text || '').trim();
  if (searchText.length === 0) {
    Dialog.show('dialog_error', Config.ERROR_TXT_NO_BLANK_ALLOWED);
    return;
  }

  const cards = Component.get('cards');
  cards.removeAll();
  loadingSection.show();
  resultSection.hide();
  noresultSection.hide();

  newsApiClient.search(searchText).then((response) => {
    if (response.status === NewsApiClient.RESULT_STATUS_OK) {
      loadingSection.hide();
      if (response.totalResults === 0) {
        noresultSection.show();
      } else {
        resultSection.show();
      }
      cards.Store.setRecords(response);
      cards.refresh();
    }
  }, () => {
    Dialog.show('dialog_error', Config.ERROR_TXT_REQUEST_NOT_COMPLETED);
  });
}

/**
 * Desktop menu
 */
Menu.create({
  id: 'desktopMenu',
  container: '#mainMenuDesktop',
  classList: ['header__desktop-menu', 'header__desktop-menu_separator_light', 'nav'],
  itemSelectedClass: 'nav__item_selected',
  itemClassList: ['nav__item'],
  items: [
    {
      link: 'index.html',
      text: 'NewsExplorer',
      classList: ['nav__item_style_light', 'logo', 'logo_light'],
    },
    {
      link: 'index.html',
      text: 'Главная',
      selected: true,
      classList: ['nav__item_style_light', 'nav__item_pull-right'],
    },
    {
      link: 'about.html',
      text: 'О проекте',
      classList: ['nav__item_style_smoke'],
    },
    {
      id: 'articlesMenuItem',
      link: 'articles.html',
      text: 'Сохраненные статьи',
      classList: ['nav__item_style_smoke'],
      hidden: true,
    },
    {
      id: 'loginMenuItem',
      renderer: () => Button.create({
        text: 'Авторизоваться',
        classList: ['btn', 'btn_rad_80', 'btn_brd_1', 'btn_style_snow', 'btn_size_s', 'btn_transparent'],
        listeners: { click: () => Dialog.show('dialog_signin') },
      }),
    },
    {
      id: 'logoutMenuItem',
      hidden: true,
      renderer: () => IconButton.create({
        id: 'logoutButton',
        text: 'Выход',
        textAlign: IconButton.TEXT_ALIGN_LEFT,
        iconClassList: ['icon', 'icon_size_24', 'icon_logout'],
        classList: ['btn', 'btn_rad_80', 'btn_brd_1', 'btn_style_snow', 'btn_size_s', 'btn_transparent'],
        listeners: {
          click: () => User.logout(),
          afterrender: (event) => {
            event.component.setText(window.localStorage.getItem('user.name'));
          },
        },
      }),
    },
    {
      id: 'menuToggleButton',
      classList: ['header__mobile-toggle'],
      renderer: () => IconButton.create({
        iconClassList: ['icon', 'icon_size_24', 'icon_menu_white'],
        listeners: {
          click: () => {
            Component.get('mobileMenu').toggle();
            Component.get('desktopMenu')
              .HtmlElement.classList.toggle('header__desktop-menu_bg-color_dark');
          },
        },
      }),
    },
  ],
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
      selected: true,
    },
    {
      link: 'about.html',
      text: 'О проекте',
    },
    {
      id: 'mobileMenu_articlesMenuItem',
      link: 'articles.html',
      text: 'Сохраненные статьи',
      hidden: true,
    },
    {
      id: 'mobileMenu_loginMenuItem',
      renderer: () => Button.create({
        text: 'Авторизоваться',
        classList: ['btn', 'btn_rad_80', 'btn_brd_1', 'btn_style_snow', 'btn_size_s', 'btn_transparent'],
        listeners: { click: () => Dialog.show('dialog_signin') },
      }),
    },
    {
      id: 'mobileMenu_logoutMenuItem',
      hidden: true,
      renderer: () => Button.create({
        text: 'Выход',
        classList: ['btn', 'btn_rad_80', 'btn_brd_1', 'btn_style_snow', 'btn_size_s', 'btn_transparent'],
        listeners: { click: () => console.log('LOGOUT!') },
      }),
    },
  ],
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    Component.get('mobileMenu').hide();
    Component.get('desktopMenu')
      .HtmlElement.classList.remove('header__desktop-menu_bg-color_dark');
  }
});

/**
 * Search button
 */
Button.create({
  container: '.search__button',
  text: 'Искать',
  classList: ['btn', 'btn_style_primary', 'btn_size_m', 'btn_rad_100', 'btn_brd_none'],
  listeners: {
    click: () => {
      searchNews(Component.get('newsSearchText').getValue());
    },
  },
});

/**
 * Search text
 */
TextField.create({
  id: 'newsSearchText',
  container: '.search__textbox',
  placeholder: 'Введите тему новости',
  classList: ['textfield', 'textfield_size_m', 'textfield_brd_none'],
  listeners: {
    keypress: (event) => {
      if (event.domEvent.keyCode === 13) {
        searchNews(event.component.getValue());
      }
    },
  },
});


watch('USER_SIGNIN', () => {
  // Articles
  Component.get('desktopMenu').getItem(3).show();
  // Authorize
  Component.get('desktopMenu').getItem(4).hide();
  // Exit
  Component.get('desktopMenu').getItem(5).show();
});

watch('USER_LOGOUT', () => {
  // Articles
  Component.get('desktopMenu').getItem(3).hide();
  // Authorize
  Component.get('desktopMenu').getItem(4).show();
  // Exit
  Component.get('desktopMenu').getItem(5).hide();
});

export {
  resetForms,
  User,
  Dialog,
};
