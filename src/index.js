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
import Component from './component';

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

class Button extends Component {
  constructor(props) {
    super(props);
    this.setText(props.text || '');
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
  }

  render() {
    return `<button>${this.text}</button>`;
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.setItems(props.items || []);
    this.selected = null;
    this.renderer = props.renderer || null;

    this.on('click', (event) => {
      if (event.domEvent.target.tagName.toLowerCase() === 'li') {
        if (this.selected) {
          this.selected.style.backgroundColor = 'white';
        }
        this.selected = event.domEvent.target;
        this.selected.style.backgroundColor = 'red';
      }
    });

    this.on('render', () => {
      if (this.selected) {
        this.selected = document.getElementById(this.selected.getAttribute('id'));
        if (this.selected) {
          this.selected.style.backgroundColor = 'red';
        }
      }
    });
  }

  setItems(items) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  addItem(item) {
    this.items.push(item);
    this.fireEvent('additem', {
      component: this,
      newItem: item,
    });
    this.refresh();
  }

  removeItem(id) {
    this.selected = null;
    this.items.splice(Number(id), 1);
    this.refresh();
  }

  getSelected() {
    return this.selected;
  }

  getSelectedId() {
    if (!this.selected) {
      return null;
    }
    return this
      .selected
      .getAttribute('id')
      .replace(`${this.getId()}-`, '');
  }

  renderItem(index, item) {
    if (this.renderer) {
      return `<li id="${this.getId()}-${index}">${this.renderer(item, index)}</li>`;
    }
    return `<li id="${this.getId()}-${index}">${item}</li>`;
  }

  render() {
    return `<ul>${this.getItems().map((item, index) => this.renderItem(index, item)).join('')}</ul>`;
  }
}

const btn = new Button({
  text: 'Add',
  classList: ['btn', 'btn_size_s'],
  listeners: {
    click: () => {
      const lstCmp = Component.getCmp('lst');
      lstCmp.addItem(lstCmp.getItems().length + 1);
    },
    render: (event) => console.log('render', event.component),
    mount: (event) => console.log('mount', event),
  },
});
btn.mountTo();

(new Button({
  text: 'Del',
  classList: ['btn', 'btn_size_s'],
  listeners: {
    click: () => {
      const lstCmp = Component.getCmp('lst');
      if (lstCmp.getSelected()) {
        lstCmp.removeItem(lstCmp.getSelectedId());
      }
    },
  },
})).mountTo();

const lst = new List({
  id: 'lst',
  items: [
    { link: 'http://1', text: 'CCC' },
    { link: 'http://2', text: 'BBB' },
    { link: 'http://3', text: 'AAA' },
    ],
  listeners: {
    click: (event) => console.log(event.component.getSelected()),
  },
  renderer: (item) => `<a href="${item.link}">${item.text}</a>`,
});
lst.mountTo();


setTimeout(() => console.log(Component.getCmp('lst').getSelected()), 10);

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
