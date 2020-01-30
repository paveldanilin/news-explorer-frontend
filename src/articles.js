import './images/favicon.png';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './components/theme.css';
import './components/styles.css';
import './components/components';
import resetForms from './components/form/form';
import Dialog from './components/dialog/dialog';
import User from './js/user/user';
import ListView from './js/component/list-view/list-view';
import NewsCard from './js/component/news-card/news-card';
import { watch } from './js/component/event-bus';
import BackendApiClient from './js/backend-api-client/backend-api-client';
import Config from './js/config';
import MsgBox from './js/component/msg-box/msg-box';
import Page from './js/util/page';
import Component from './js/component/component';
import Element from './js/component/element';
import HttpClient from './js/http-client/http-client';
import './js/menu';
import Text from './js/util/text';

const backendApiClient = new BackendApiClient({
  host: Config.BACKEND_API_HOST,
  httpClient: HttpClient.create(),
});
const noResultSection = Element.wrap('#noresult').hide();
const resultSection = Element.wrap('#result').show();
const welcomeLabel = Element.wrap('#welcome');
const welcomeLabelTemplate = welcomeLabel.text();
const articleStatLabel = Element.wrap('#articleStat');
const articleStatTemplate = articleStatLabel.text();
const keywordLabel = Element.wrap('#keyword').hide();

function refreshWelcomeText(articleCount) {
  welcomeLabel.text(Text.interpolate(welcomeLabelTemplate, {
    user: User.getName(),
    articleCount,
  }));
}

function refreshArticleStatText(firstTwoKeywords, keywordCount) {
  articleStatLabel.text(Text.interpolate(articleStatTemplate, {
    firstTwoKeywords,
    keywordCount,
  }));
}

function refreshGrid() {
  const keywordsList = [];

  backendApiClient
    .getArticles(User.getToken())
    .then((articles) => {
      const grid = Component.get('cards');
      grid.removeAll();
      grid.Store.setRecords(articles);
      grid.refresh();

      if (articles.length === 0) {
        resultSection.hide();
        noResultSection.show();
        keywordLabel.hide();
      } else {
        resultSection.show();
        noResultSection.hide();
        keywordLabel.show();
      }

      articles.forEach((article) => {
        if (!keywordsList.includes(article.keyword)) {
          keywordsList.push(article.keyword);
        }
      });

      refreshWelcomeText(articles.length);
      refreshArticleStatText(keywordsList.slice(0, 2), keywordsList.length);
    })
    .catch(() => {
      MsgBox.error('Ошибка!', 'Не смогли загрузить список статей!');
    });
}

/**
 * Cards grid
 */
ListView.create({
  id: 'cards',
  container: '#cardsGrid',
  classList: ['search-result__grid'],
  store: {
    recordDefinition: [
      { name: 'imageLink', mapping: 'image' },
      { name: 'createdAt', mapping: 'date' },
      { name: 'title' },
      { name: 'keyword' },
      { name: 'contentText', mapping: 'text' },
      { name: 'sourceLabel', mapping: 'source' },
      { name: 'sourceLink', mapping: 'link' },
      { name: 'articleId', mapping: '_id' },
    ],
    dataRoot: 'articles',
  },
  itemRenderer: (record) => NewsCard.create({
    articleId: record.get('articleId'),
    imageLink: record.get('imageLink'),
    createdAt: record.get('createdAt'),
    title: Text.escape(record.get('title')),
    contentText: Text.escape(record.get('contentText')),
    sourceLabel: Text.escape(record.get('sourceLabel')),
    sourceLink: record.get('sourceLink'),
    keyword: record.get('keyword'),
    toolbar: ['delete', 'keyword'],
    listeners: {
      deleteitem: () => {
        Component.get('cards').Store.delete('articleId', record.get('articleId'));
        refreshWelcomeText(Component.get('cards').Store.All.length);
        const keywordsList = Component.get('cards').Store.All.map((storedRecord) => storedRecord.get('keyword'));
        refreshArticleStatText(keywordsList.slice(0, 2), keywordsList.length);
      },
    },
  }),
});

if (User.getName() === null) {
  // Redirect to start page
  Page.redirect('index.html');
}

refreshWelcomeText('N');
refreshArticleStatText('', 0);
refreshGrid();

watch('USER_LOGOUT', () => {
  Page.redirect('index.html');
});

export {
  resetForms, Dialog,
};
