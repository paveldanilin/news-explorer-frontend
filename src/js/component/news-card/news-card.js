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
      articleId,
      keyword,
      imageLink,
      createdAt,
      title,
      contentText,
      sourceLabel,
      sourceLink,
      toolbar,
    } = props;

    this.articleId = articleId || null;
    this.imageLink = imageLink;
    this.createdAt = createdAt;
    this.title = title;
    this.keyword = keyword || '';
    this.contentText = contentText;
    this.sourceLabel = sourceLabel;
    this.sourceLink = sourceLink;
    this.toolbar = toolbar || [];

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
                ${this.renderToolbar()}
            </div>`;
  }

  onRender(element) {
    if (this.articleId) {
      element.setAttribute('news-card', this.articleId);
    }
    this.onRenderSaveBtn(element);
    this.onRenderDeleteBtn(element);
    this.onRenderKeywordLabel(element);
  }

  onRenderDeleteBtn(element) {
    const delBtn = Element.wrap(element.querySelector('[name="delete-btn"]'));
    if (!delBtn) {
      return;
    }

    delBtn.posStyle('absolute').pos(NewsCard.getOffset().x, NewsCard.getOffset().y);

    delBtn.on('mouseover', () => {
      delBtn.ClassList.remove('icon_delete_normal');
      delBtn.ClassList.add('icon_delete_hover');
    });
    delBtn.on('mouseout', () => {
      delBtn.ClassList.add('icon_delete_normal');
      delBtn.ClassList.remove('icon_delete_hover');
    });
    delBtn.on('click', () => {
      backendApiClient
        .removeArticle(this.HtmlElement.getAttribute('news-card'), User.getToken())
        .then(() => {
          this.destroy();
          this.fireEvent('deleteitem');
        })
        .catch((error) => {
          error.Response.json().then((errorBody) => {
            MsgBox.error('Ошибка при удалении  статьи', errorBody.message.replace(/&quot;/g, '"'));
          });
        });
    });
  }

  onRenderSaveBtn(element) {
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
            this.fireEvent('deleteitem');
          })
          .catch((error) => {
            error.Response.json().then((errorBody) => {
              MsgBox.error('Ошибка при удалении  статьи', errorBody.message.replace(/&quot;/g, '"'));
            });
          });
      } else {
        backendApiClient
          .createArticle({
            keyword: this.keyword,
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
            this.fireEvent('saveitem');
          })
          .catch((error) => {
            error.Response.json().then((errorBody) => {
              MsgBox.error('Ошибка при сохранении статьи', errorBody.message.replace(/&quot;/g, '"'));
            });
          });
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onRenderKeywordLabel(element) {
    const label = Element.wrap(element.querySelector('[name="keyword-label"]'));
    if (!label) {
      return;
    }
    let labelX = NewsCard.getOffset().x;
    if (window.innerWidth < 1440) {
      labelX -= 160;
      if (window.innerWidth < 768) {
        labelX -= 60;
      }
    } else if (window.innerWidth >= 1440) {
      labelX -= 320;
    }
    label.posStyle('absolute').pos(labelX, NewsCard.getOffset().y);
  }

  renderToolbar() {
    if (this.toolbar.length === 0) {
      return '';
    }
    return `<span style="position: relative">
                ${this.toolbar.map((tbb) => this.renderToolbarButton(tbb)).join(' ')}
            </span>`;
  }

  renderToolbarButton(btn) {
    switch (btn) {
      case 'save':
        return '<i name="save-btn" class="icon icon_size_40 icon_save_normal"></i>';
      case 'delete':
        return '<i name="delete-btn" class="icon icon_size_40 icon_delete_normal"></i>';
      case 'keyword':
        return `
                  <a name="keyword-label" class="tooltip" href="https://www.google.com/search?q=${this.keyword}" target="_blank">
                    ${this.keyword}
                  </a>
                `;
      default:
        return '';
    }
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
    document.querySelectorAll('[name="delete-btn"]').forEach((el) => {
      const wrapper = Element.wrap(el);
      wrapper.posStyle('absolute').pos(NewsCard.getOffset().x, NewsCard.getOffset().y);
    });
    document.querySelectorAll('[name="keyword-label"]').forEach((el) => {
      const wrapper = Element.wrap(el);
      let labelX = NewsCard.getOffset().x;
      if (window.innerWidth < 1440) {
        labelX -= 160;
        if (window.innerWidth < 768) {
          labelX -= 60;
        }
      } else if (window.innerWidth >= 1440) {
        labelX -= 320;
      }
      wrapper.posStyle('absolute').pos(labelX, NewsCard.getOffset().y);
    });
  }
}

window.addEventListener('resize', () => {
  NewsCard.onResize();
});

setTimeout(() => NewsCard.onResize(), 0);
