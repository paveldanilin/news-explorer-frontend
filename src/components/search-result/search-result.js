import './search-result.css';

class SearchResult {
  constructor() {
    this.htmlElement = document.querySelector('.search-result');
    this.gridHtmlElement = document.querySelector('.search-result__grid');
    this.showMoreButton = document.querySelector('.search-result__btn-more');

    this.state = {
      pageNumber: 1,
      pageSize: 3,
      articles: [],
    };
  }

  append(cardModel) {
    this.gridHtmlElement.appendChild(SearchResult.createCard(cardModel));
  }

  update(articles) {
    if (!this.gridHtmlElement) {
      return;
    }

    this.state.pageNumber = 1;
    this.state.articles = articles;

    this.removeAll();

    this.paginate().forEach((cardModel) => {
      this.append(cardModel);
    });

    if (this.getPageCount() > 1) {
      this.showShowMoreButton();
    } else {
      this.hideShowMoreButton();
    }

    this.endLoading();

    if (articles.length === 0) {
      document.getElementById('noresult').style.display = 'flex';
      document.getElementById('loading').style.display = 'none';
      this.htmlElement.style.display = 'none';
    }
  }

  beginLoading() {
    // hides no result section
    document.getElementById('noresult').style.display = 'none';
    // shows preloader section
    document.getElementById('loading').style.display = 'flex';
    // hides grid
    this.htmlElement.style.display = 'none';
    this.removeAll();
    this.state.articles = [];
    this.state.pageNumber = 1;
  }

  endLoading() {
    document.getElementById('loading').style.display = 'none';
    this.htmlElement.style.display = 'block';
  }

  removeAll() {
    if (!this.gridHtmlElement) {
      return false;
    }
    while (this.gridHtmlElement.firstChild) {
      this.gridHtmlElement.removeChild(this.gridHtmlElement.firstChild);
    }
    return true;
  }

  static generateId(title) {
    let hash = 0;
    if (title.length === 0) return hash;
    for (let i = 0; i < title.length; i += 1) {
      const chr = title.charCodeAt(i);
      // eslint-disable-next-line no-bitwise
      hash = ((hash << 5) - hash) + chr;
      // eslint-disable-next-line no-bitwise
      hash &= hash;
    }
    return hash;
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
    return `${date.getDate()} ${SearchResult.decodeMonth(date.getMonth())}, ${date.getFullYear()}`;
  }

  static createCard(cardModel) {
    const {
      imageLink, title, contentText, sourceLink, sourceLabel, createdAt,
    } = cardModel;

    const cardId = SearchResult.generateId(sourceLink);

    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.classList.add('card_grow');
    cardEl.classList.add('card_dir_ver');
    cardEl.setAttribute('id', String(cardId));
    cardEl.onclick = () => {
      window.open(sourceLink, '_blank');
    };

    // TODO: lazy loading
    const img = document.createElement('img');
    img.alt = title;
    if (imageLink) {
      img.src = imageLink;
      img.classList.add('search-result__card-image');
      img.classList.add('search-result__card-image_placeholder');
      img.onload = () => {
        img.classList.remove('search-result__card-image_placeholder');
      };
      img.onerror = () => {
        img.src = '';
      };
    } else {
      img.classList.add('search-result__card-image');
      img.classList.add('search-result__card-image_placeholder');
    }
    cardEl.appendChild(img);

    const createdDate = document.createElement('div');
    createdDate.classList.add('search-result__card-created');
    createdDate.innerText = SearchResult.formatDate(createdAt);

    const cardTitle = document.createElement('h4');
    cardTitle.innerText = title;
    cardTitle.classList.add('search-result__card-title');

    const text = document.createElement('p');
    text.innerText = contentText;
    text.classList.add('search-result__card-text');

    const source = document.createElement('a');
    source.innerText = sourceLabel;
    source.href = sourceLink;
    source.target = '_blank';
    source.classList.add('search-result__card-source');

    const body = document.createElement('div');
    body.classList.add('card__body');
    body.classList.add('search-result__card-body');

    const footer = document.createElement('div');
    footer.classList.add('card__footer');
    footer.classList.add('search-result__card-footer');
    footer.appendChild(source);

    body.appendChild(createdDate);
    body.appendChild(cardTitle);
    body.appendChild(text);

    cardEl.appendChild(body);
    cardEl.appendChild(footer);

    return cardEl;
  }

  paginate() {
    if (this.state.articles.length === 0) {
      return [];
    }
    const startOffset = this.state.pageNumber - 1;
    return this.state.articles.slice(
      startOffset * this.state.pageSize,
      (startOffset + 1) * this.state.pageSize,
    );
  }

  hideShowMoreButton() {
    if (this.showMoreButton) {
      this.showMoreButton.style.display = 'none';
    }
  }

  showShowMoreButton() {
    if (this.showMoreButton) {
      this.showMoreButton.style.display = 'inline-block';
    }
  }

  getPageCount() {
    return Math.ceil(this.state.articles.length / this.state.pageSize);
  }

  showNextPage() {
    const pageCount = this.getPageCount();
    this.state.pageNumber += 1;

    if (this.state.pageNumber <= pageCount) {
      const rowChunk = this.paginate();
      rowChunk.forEach((card) => this.append(card));
    }

    if (this.state.pageNumber >= pageCount) {
      this.hideShowMoreButton();
      this.state.pageNumber -= 1;
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export const searchResult = new SearchResult();
