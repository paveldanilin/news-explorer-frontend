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
import Button from './js/component/form/button';
import Menu from './js/component/menu/menu';

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
      .replace(`${this.Id}-`, '');
  }

  renderItem(index, item) {
    if (this.renderer) {
      return `<li id="${this.Id}-${index}">${this.renderer(item, index)}</li>`;
    }
    return `<li id="${this.Id}-${index}">${item}</li>`;
  }

  render() {
    return `<ul>${this.getItems().map((item, index) => this.renderItem(index, item)).join('')}</ul>`;
  }
}

(Button.create({
  text: 'Add',
  classList: ['btn', 'btn_size_s'],
  listeners: {
    click: () => {
      const selected = Component.getCmp('myDropDown').getSelected();
      if (selected) {
        Component
          .getCmp('lst')
          .addItem({ link: selected.record.get('url'), text: selected.record.get('title') });
      }
    },
  },
})).mount('#myToolbar');

(Button.create({
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
})).mount('#myToolbar');

(new List({
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
})).mount('#myList');


DropDown.create({
  id: 'myDropDown',
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
}).mount('#myToolbar');

DropDown.create({
  id: 'testDropDown',
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
}).mount('#myToolbar');

Button.create({
  text: 'Secret toggle',
  listeners: {
    click: () => {
      console.log(12313132);
      if (Component.getCmp('myMenu').get(2).isHidden()) {
        Component.getCmp('myMenu').get(2).show();
      } else {
        Component.getCmp('myMenu').get(2).hide();
      }
      Component.getCmp('myMenu').refresh();
    },
  },
}).mount();


Menu.create({
  id: 'myMenu',
  classList: ['header__desktop-menu', 'header__desktop-menu_separator_light', 'nav'],
  itemSelectedClass: 'nav__item_selected',
  itemClassList: ['nav__item'],
  items: [
    { link: 'http://a.com', text: 'Go!', classList: ['nav__item_style_light'] },
    { link: 'http://b.com', text: 'Fly!', classList: ['nav__item_style_light', 'nav__item_pull-right'] },
    {
      link: 'http://hidden.com',
      text: 'Secret!',
      classList: ['nav__item_style_light'],
      hidden: true,
    },
    {
      renderer: () => Button.create({
        text: 'This is test button!',
        classList: ['btn', 'btn_rad_80', 'btn_brd_1', 'btn_style_snow', 'btn_size_s', 'btn_transparent'],
        listeners: { click: () => Dialog.show('dialog_error', 'TEST BUTTON!') },
      }),
    },
  ],
}).mount('#myMenuContainer');


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
