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
      // TODO: error handler
    });
  } else {
    Dialog.show('dialog_error_nokeyword');
  }
});

function onClickShowMoreNews() {
  searchResult.showNextPage();
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
