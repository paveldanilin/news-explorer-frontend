import './search-result.css';
import Spinner from '../spinner/spinner';

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
  }

  beginLoading() {
    Spinner.show('dual-ring');
    this.htmlElement.style.display = 'none';
    this.removeAll();
  }

  endLoading() {
    Spinner.closeActive();
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
    cardEl.classList.add('card_dir-ver');
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

    body.appendChild(cardTitle);
    body.appendChild(text);
    body.appendChild(source);

    cardEl.appendChild(body);

    return cardEl;
  }
}

export const searchResult = new SearchResult();
