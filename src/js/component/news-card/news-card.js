import '../../../images/placeholder.png';
import Component from '../component';
import Picture from '../picture/picture';
import Element from '../element';
import User from '../../user/user';
import BackendApiClient from '../../backend-api-client/backend-api-client';
import Config from '../../config';
import MsgBox from '../msg-box/msg-box';

const backendApiClient = new BackendApiClient(Config.BACKEND_API_HOST);

export default class NewsCard extends Component {
  constructor(props) {
    super(props);

    const {
      imageLink, createdAt, title, contentText, sourceLabel, sourceLink,
    } = props;

    this.imageLink = imageLink;
    this.createdAt = createdAt;
    this.title = title;
    this.contentText = contentText;
    this.sourceLabel = sourceLabel;
    this.sourceLink = sourceLink;

    this.on('render', (event) => this.onRender(event.element));
  }

  render() {
    Picture.create({
      src: this.imageLink,
      placeholder: '/images/placeholder.png',
      classList: ['search-result__card-image'],
      alt: this.title,
    }).mount(this, 'first');

    return `<div class="card card_grow card_dir_ver">
                <!-- Picture -->
                <div class="card__body search-result__card-body">
                    <div class="search-result__card-created">
                        ${NewsCard.formatDate(this.createdAt)}
                    </div>
                    <h4 class="search-result__card-title">${this.title}</h4>
                    <p class="search-result__card-text">${this.contentText}</p>
                </div>
                <div class="card__footer search-result__card-footer">
                    <a href="${this.sourceLink}" target="_blank" class="search-result__card-source">
                        ${this.sourceLabel}
                    </a>
                </div>
                <span style="position: relative">
                    <i name="save-btn" class="icon icon_size_40 icon_save_normal"></i>
                </span>
            </div>`;
  }

  onRender(element) {
    const saveBtn = Element.wrap(element.querySelector('[name="save-btn"]'));
    if (!saveBtn) {
      return;
    }

    saveBtn.posStyle('absolute').pos(NewsCard.getOffset().x, NewsCard.getOffset().y);

    const tooltip = Element.create({
      tag: 'span',
      classList: ['tooltip'],
    }, true)
      .mount('body')
      .text('Войдите, чтобы сохранять статьи')
      .posStyle('absolute')
      .hide();

    saveBtn.on('mouseover', () => {
      if (this.HtmlElement.hasAttribute('news-card')) {
        // If card already saved, skip
        return;
      }
      saveBtn.ClassList.remove('icon_save_normal');
      saveBtn.ClassList.add('icon_save_hover');
      if (!tooltip.isVisible() && User.getName() === null) {
        tooltip
          .show()
          .pos(Element.offset(saveBtn).left - 190, Element.offset(saveBtn).top);
      }
    });
    saveBtn.on('mouseout', () => {
      if (this.HtmlElement.hasAttribute('news-card')) {
        // If card already saved, skip
        return;
      }
      saveBtn.ClassList.add('icon_save_normal');
      saveBtn.ClassList.remove('icon_save_hover');
      if (tooltip.isVisible()) {
        tooltip.hide();
      }
    });
    saveBtn.on('click', () => {
      if (User.getName() === null) {
        return;
      }

      if (this.HtmlElement.hasAttribute('news-card')) {
        backendApiClient
          .removeArticle(this.HtmlElement.getAttribute('news-card'), User.getToken())
          .then(() => {
            MsgBox.msg('Удаление статьи', 'Статья была удалена!');
            saveBtn.ClassList.add('icon_save_normal');
            saveBtn.ClassList.remove('icon_save_hover');
            saveBtn.ClassList.remove('icon_save_marked');
            this.HtmlElement.removeAttribute('news-card');
          })
          .catch((error) => {
            error.Response.json().then((errorBody) => {
              MsgBox.error('Ошибка при удалении  статьи', errorBody.message.replace(/&quot;/g, '"'));
            });
          });
      } else {
        backendApiClient
          .createArticle({
            keyword: 'test',
            title: this.title,
            text: this.contentText,
            date: this.createdAt,
            source: this.sourceLabel,
            link: this.sourceLink,
            image: this.imageLink,
          }, User.getToken())
          .then((response) => {
            MsgBox.msg('Сохранение статьи', 'Статья была сохранена!');
            saveBtn.ClassList.remove('icon_save_normal');
            saveBtn.ClassList.remove('icon_save_hover');
            saveBtn.ClassList.add('icon_save_marked');
            this.HtmlElement.setAttribute('news-card', response.id);
          })
          .catch((error) => {
            error.Response.json().then((errorBody) => {
              MsgBox.error('Ошибка при сохранении статьи', errorBody.message.replace(/&quot;/g, '"'));
            });
          });
      }
    });
  }

  static recordDefinition() {
    return [
      { name: 'imageLink', mapping: 'urlToImage' },
      { name: 'createdAt', mapping: 'publishedAt' },
      { name: 'title' },
      { name: 'contentText', mapping: 'description' },
      { name: 'sourceLabel', mapping: 'source.name' },
      { name: 'sourceLink', mapping: 'url' },
    ];
  }

  static decodeMonth(month, language) {
    // TODO: move
    const monthDic = {
      ru: [
        'января',
        'февраля',
        'марта',
        'апреля',
        'июля',
        'июня',
        'августа',
        'сентября',
        'октебря',
        'ноября',
        'декабря',
      ],
    };
    const dic = monthDic[language] || monthDic.ru;
    return dic[month];
  }

  static formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate()} ${NewsCard.decodeMonth(date.getMonth())}, ${date.getFullYear()}`;
  }

  static getOffset() {
    let offsetX;
    let offsetY;
    if (window.innerWidth < 1440) {
      offsetX = 170;
      offsetY = -490;
      if (window.innerWidth < 768) {
        offsetX = 230;
        offsetY = -550;
      }
    } else if (window.innerWidth >= 1440) {
      offsetX = 340;
      offsetY = -650;
    }
    return { x: offsetX, y: offsetY };
  }

  static onResize() {
    document.querySelectorAll('[name="save-btn"]').forEach((el) => {
      const wrapper = Element.wrap(el);
      wrapper.posStyle('absolute').pos(NewsCard.getOffset().x, NewsCard.getOffset().y);
    });
  }
}

window.addEventListener('resize', () => {
  NewsCard.onResize();
});

setTimeout(() => NewsCard.onResize(), 0);
