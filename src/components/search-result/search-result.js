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
      this.gridHtmlElement.appendChild(this.createCard(cardModel));
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

  /*
    <div class="card card_dir-ver">
      <img src="images/avatar.png" alt="Author avatar">
      <div class="card__body">
        <h2>Об авторе</h2>
        <p>Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
        <p>Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
      </div>
    </div>
   */
  createCard(cardModel) {
    const { imageLink, createdAt, title, contentText, sourceLink, sourceLabel, cardId } = cardModel;

    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.classList.add('card_dir-ver');

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

export let searchResult = new SearchResult();
