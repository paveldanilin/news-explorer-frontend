import './images/favicon.png';
import './images/user.png';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './components/theme.css';
import './components/styles.css';
import './components/components';
import resetForms from './components/form/form';
import User from './js/user/user';
import Dialog from './components/dialog/dialog';
import Carousel from './js/component/carousel/carousel';
import Config from './js/config';
import './js/menu';

Carousel.create({
  container: '.gh-commits',
  store: {
    recordDefinition: [
      { name: 'name', mapping: 'commit.author.name' },
      { name: 'email', mapping: 'commit.author.email' },
      { name: 'message', mapping: 'commit.message' },
      { name: 'url', mapping: 'html_url' },
      { name: 'avatar', mapping: 'author.avatar_url' },
    ],
    dataProxy: {
      url: `https://api.github.com/repos/${Config.GH_COMMITS_OWNER}/${Config.GH_COMMITS_REPO}/commits`,
    },
    autoload: true,
  },
  renderer: (record) => {
    const name = record.get('name');
    const email = record.get('email');
    const msg = record.get('message');
    const avatar = record.get('avatar');
    return `<div class="ycard">
              <div class="flex-container">
                <img src="${avatar || 'images/user.png'}" alt="Иконка пользователя GitHub" class="ycard__icon">
                <span class="flex-container flex-container_direction_col">
                  <span class="ycard__title">${name}</span>
                  <span class="ycard__subtitle">${email}</span>
                </span>
              </div>
              <div class="ycard__body">${msg}</div>
            </div>`;
  },
  listeners: {
    resize: (event) => {
      if (window.innerWidth < 768) {
        event.component.setPerView(1);
      } else {
        event.component.setPerView(3);
      }
    },
  },
});


export {
  resetForms, Dialog, User,
};
