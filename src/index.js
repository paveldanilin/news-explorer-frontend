import './images/favicon.png';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './components/theme.css';
import './components/styles.css';
import './components/components';
import resetForms from './components/form/form';
import { showSigninDialog, onSigninHandler, toggleMobileMenu } from './components/header/header';
import Dialog from './components/dialog/dialog';
import register from './js/user/register';
import login from './js/user/login';
import { search } from './components/search/search';
import { searchResult } from './components/search-result/search-result';
import NewsApiClient from './js/news-api-client/news-api-client';
import Config from './js/config';
import Component from './js/component/component';
import DropDown from './js/component/form/drop-down';
import Button from './js/component/form/button/button';
import Menu from './js/component/menu/menu';
import IconButton from './js/component/form/button/icon-button';
import ImageButton from './js/component/form/button/image-button';

const newsApiClient = new NewsApiClient(Config.NEWS_API_TOKEN, Config.NEWS_API_LANGUAGE);

search.onSearch((searchText) => {
  if (searchText !== null && searchText !== undefined && searchText.trim().length > 0) {
    searchResult.beginLoading();
    newsApiClient.search(searchText).then((response) => {
      if (response.status === NewsApiClient.RESULT_STATUS_OK) {
        const articles = response.articles.map((articleRawData) => ({
          imageLink: articleRawData.urlToImage,
          createdAt: articleRawData.publishedAt,
          title: articleRawData.title,
          contentText: articleRawData.description,
          sourceLink: articleRawData.url,
          sourceLabel: articleRawData.source.name,
        }));
        searchResult.update(articles);
      }
    }, () => {
      Dialog.show('dialog_error', Config.ERROR_TXT_REQUEST_NOT_COMPLETED);
    });
  } else {
    Dialog.show('dialog_error', Config.ERROR_TXT_NO_BLANK_ALLOWED);
  }
});

function onClickShowMoreNews() {
  searchResult.showNextPage();
}


DropDown.create({
  id: 'myDropDown',
  container: '#myToolbar',
  store: {
    recordDefinition: [
      { name: 'albumId' },
      { name: 'id' },
      { name: 'title' },
      { name: 'url' },
      { name: 'thumb', mapping: 'thumbnailUrl' },
    ],
    dataProxy: {
      url: 'https://jsonplaceholder.typicode.com/photos',
    },
    autoload: true,
  },
  valueField: 'id',
  descriptionField: 'url',
  listeners: {
    change: (event) => {
      console.log('change', event.component.getSelected());
    },
  },
});

DropDown.create({
  id: 'testDropDown',
  container: '#myToolbar',
  store: {
    recordDefinition: [{ name: 'id' }, { name: 'text' }],
  },
  valueField: 'id',
  descriptionField: 'text',
  listeners: {
    mount: (event) => {
      event.component.Store.setRecords([
        { id: 1, text: 'test' },
        { id: 2, text: 'boom' },
      ]);
      event.component.refresh();
    },
  },
});

Button.create({
  container: '#myToolbar',
  text: 'Secret toggle',
  listeners: {
    click: () => {
      if (Component.getCmp('myMenu').findById('articlesMenuItem').isHidden()) {
        Component.getCmp('myMenu').findById('articlesMenuItem').show();
      } else {
        Component.getCmp('myMenu').findById('articlesMenuItem').hide();
      }

      if (Component.getCmp('loginMenuItem').isHidden()) {
        Component.getCmp('loginMenuItem').show();
      } else {
        Component.getCmp('loginMenuItem').hide();
      }

      if (Component.getCmp('logoutMenuItem').isHidden()) {
        Component.getCmp('logoutMenuItem').show();
      } else {
        Component.getCmp('logoutMenuItem').hide();
      }
    },
  },
});


Menu.create({
  id: 'myMenu',
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
      classList: ['nav__item_style_light'],
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
      renderer: () => Button.create({
        text: 'Выход',
        classList: ['btn', 'btn_rad_80', 'btn_brd_1', 'btn_style_snow', 'btn_size_s', 'btn_transparent'],
        listeners: { click: () => console.log('LOGOUT!') },
      }),
    },
  ],
});

IconButton.create({
  container: '#myToolbar',
  text: 'Ba!',
  classList: ['btn', 'btn_brd_none', 'btn_transparent', 'btn_size_xxs'],
  iconClassList: ['icon', 'icon_size_24', 'icon_menu_black'],
  listeners: {
    click: (event) => console.log('Ba!', event),
  },
});

IconButton.create({
  container: '#myToolbar',
  text: 'Bo!',
  textAlign: 'left',
  classList: ['btn', 'btn_brd_none', 'btn_transparent', 'btn_size_xxs'],
  iconClassList: ['icon', 'icon_size_24', 'icon_menu_black'],
  listeners: {
    click: (event) => console.log('Bo!', event),
  },
});

ImageButton.create({
  id: 'imageButton',
  container: '#myToolbar',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPP_8oD-jbBJVuXuv4eUVOvy7gMqP67uTWrF3wPRKk1fZyFFftUw&s',
  hoverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIUa-kL6Q5Vfw7cOlg6tsA_tP2ZY8MX5Y37cbjjI7vXuSgzraGXw&s',
  listeners: {
    click: () => console.log('IMAGE!'),
  },
});

export {
  resetForms,
  showSigninDialog,
  onSigninHandler,
  toggleMobileMenu,
  onClickShowMoreNews,
  login,
  register,
  Dialog,
};
