import './search-result.css';

class SearchResult {
  constructor() {
    this.htmlElement = document.querySelector('.search-result');
    this.gridHtmlElement = document.querySelector('.search-result__grid');
  }

  update(results) {
    if (!this.gridHtmlElement) {
      return;
    }

    this.removeAll();

    results.forEach((cardModel) => {
      this.gridHtmlElement.appendChild(SearchResult.createCard(cardModel));
    });

    this.endLoading();

    if (results.length === 0) {
      document.getElementById('noresult').style.display = 'flex';
      document.getElementById('loading').style.display = 'none';
      this.htmlElement.style.display = 'none';
    }
  }

  beginLoading() {
    document.getElementById('noresult').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    this.htmlElement.style.display = 'none';
    this.removeAll();
  }

  endLoading() {
    document.getElementById('loading').style.display = 'none';
    this.htmlElement.style.display = 'block';
  }

  removeAll() {
    if (!this.gridHtmlElement) {
      return;
    }
    while (this.gridHtmlElement.firstChild) {
      this.gridHtmlElement.removeChild(this.gridHtmlElement.firstChild);
    }
  }

  static createCard(cardModel) {
    const {
      imageLink, title, contentText, sourceLink, sourceLabel, cardId,
    } = cardModel;

    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.classList.add('card_dir_ver');
    cardEl.setAttribute('id', cardId);

    const img = document.createElement('div');
    img.style.backgroundImage = `url(${imageLink})`;
    img.classList.add('search-result__card-image');
    cardEl.appendChild(img);

    const cardTitle = document.createElement('h4');
    cardTitle.innerText = title;
    cardTitle.classList.add('search-result__card-title');

    const text = document.createElement('p');
    text.innerText = contentText;
    text.classList.add('search-result__card-text');

    const source = document.createElement('p');
    source.innerText = sourceLabel;
    source.href = sourceLink;
    source.classList.add('search-result__card-source');

    const body = document.createElement('div');
    body.classList.add('card__body');
    body.classList.add('search-result__card');

    const footer = document.createElement('div');
    footer.classList.add('card__footer');
    footer.classList.add('search-result__card-footer');
    footer.appendChild(source);

    body.appendChild(cardTitle);
    body.appendChild(text);

    cardEl.appendChild(body);
    cardEl.appendChild(footer);

    return cardEl;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const searchResult = new SearchResult();
