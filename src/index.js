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
import Component from './js/component/component';
import ListView from './js/component/list-view/list-view';
import NewsCard from './js/component/news-card/news-card';
import TextField from './js/component/form/text-field/text-field';
import Element from './js/component/element';
import Record from './js/data/record';
import UuidGenerator from './js/util/uuid-generator';
import './js/menu';

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
    recordDefinition: [
      { name: 'imageLink', mapping: 'urlToImage' },
      { name: 'createdAt', mapping: 'publishedAt' },
      { name: 'title' },
      { name: 'keyword' },
      { name: 'contentText', mapping: 'description' },
      { name: 'sourceLabel', mapping: 'source.name' },
      { name: 'sourceLink', mapping: 'url' },
    ],
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
    keyword: record.get('keyword'),
    toolbar: ['save'],
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
const loadingSection = Element.wrap('#loading').hide();
const noresultSection = Element.wrap('#noresult').hide();
const resultSection = Element.wrap('#searchResult').hide();

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
      cards.Store.setRecords(response, (article) => Record
        .create(
          cards.Store.RecordDefinition,
          { ...article, ...{ keyword: text } },
          UuidGenerator.generate(),
        ));
      cards.refresh();
    }
  }, () => {
    Dialog.show('dialog_error', Config.ERROR_TXT_REQUEST_NOT_COMPLETED);
  });
}

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

export {
  resetForms,
  User,
  Dialog,
};
