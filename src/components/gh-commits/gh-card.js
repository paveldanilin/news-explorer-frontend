import HtmlElement from '../../js/html-element';

export default class GhCard {
  constructor(authorName, authorEmail, message, authorAvatarUrl, htmlUrl) {
    this.authorName = authorName;
    this.authorEmail = authorEmail;
    this.message = message;
    this.authorAvatarUrl = authorAvatarUrl;
    this.htmlUrl = htmlUrl;
  }

  render(container) {
    return HtmlElement.render({
      tag: 'li',
      classList: ['glide__slide'],
      children: [
        // container
        {
          tag: 'div',
          classList: ['ycard'],
          listeners: {
            click: () => {
              window.open(this.htmlUrl, '_blank');
            },
          },
          children: [
            // Header
            {
              tag: 'div',
              classList: ['flex-container'],
              children: [
                this.createAvatarElement(),
                this.createHeaderElement(),
              ],
            },
            this.createBodyElement(),
          ],
        },
      ],
    }, container);
  }

  createAvatarElement() {
    const authorImg = {
      classList: ['ycard__icon'],
    };
    if (this.authorAvatarUrl) {
      authorImg.tag = 'img';
      authorImg.attributes = {
        src: this.authorAvatarUrl,
        alt: 'Иконка пользователя GitHub',
      };
    } else {
      authorImg.tag = 'div';
      authorImg.classList.push('icon');
      authorImg.classList.push('icon_user');
      authorImg.classList.push('icon_size_24');
    }
    return authorImg;
  }

  createHeaderElement() {
    return {
      tag: 'span',
      classList: ['flex-container', 'flex-container_direction_col'],
      children: [
        {
          tag: 'span',
          classList: ['ycard__title'],
          attributes: {
            textContent: this.authorName || 'unknown',
          },
        },
        {
          tag: 'span',
          classList: ['ycard__subtitle'],
          attributes: {
            textContent: this.authorEmail || 'unknown@gmail.com',
          },
        },
      ],
    };
  }

  createBodyElement() {
    return {
      tag: 'div',
      classList: ['ycard__body'],
      attributes: {
        textContent: this.message || '',
      },
    };
  }
}
