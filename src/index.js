import './images/favicon.png';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './theme.css';
import './styles.css';
import './components/components';
import resetForms from './components/form/form';
import { showSigninDialog, onSigninHandler, toggleMobileMenu } from './components/header/header';
import Dialog from './components/dialog/dialog';
import register from './user/register';
import login from './user/login';
import { search } from './components/search/search';
import { searchResult } from './components/search-result/search-result';
import NewsApiClient from './news-api-client/news-api-client';

const newsApiClient = new NewsApiClient('43d52ebfb7ed449986028b50cbcee7c7', 'ru');
const state = {
  pageNumber: 1,
  pageSize: 3,
  articles: [],
};

function paginate(array, pageSize, pageNumber) {
  const startOffset = pageNumber - 1;
  return array.slice(startOffset * pageSize, (startOffset + 1) * pageSize);
}

search.onSearch((searchText) => {
  if (searchText !== null && searchText !== undefined && searchText.trim().length > 0) {
    searchResult.beginLoading();
    state.articles = [];
    state.pageNumber = 1;
    newsApiClient.search(searchText).then((response) => {
      // console.log('data', response);
      if (response.status === NewsApiClient.RESULT_STATUS_OK) {
        // console.log(response.articles);
        state.articles = response.articles.map((articleRawData) => ({
          imageLink: articleRawData.urlToImage,
          createdAt: articleRawData.publishedAt,
          title: articleRawData.title,
          contentText: articleRawData.description,
          sourceLink: articleRawData.url,
          sourceLabel: articleRawData.source.name,
          cardId: Math.floor(Date.now() / 1000),
        }));
        if (state.articles.length > 0) {
          searchResult.update(paginate(state.articles, state.pageSize, state.pageNumber));
        } else {
          searchResult.update([]);
        }
      }
    }, () => {
      // console.log('reject', reason);
    });
  }
});

function onClickShowMoreNews() {
  state.pageNumber += 1;
  if (state.pageNumber < Math.floor(state.articles.length / state.pageSize)) {
    const rowChunk = paginate(state.articles, state.pageSize, state.pageNumber);
    rowChunk.forEach((card) => searchResult.append(card));
  } else {
    state.pageNumber -= 1;
  }
}

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
