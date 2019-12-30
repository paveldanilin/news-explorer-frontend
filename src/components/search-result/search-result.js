import './search-result.css';

class SearchResult {
  constructor() {
    this.htmlElement = document.querySelector('.search-result');
    this.gridHtmlElement = document.querySelector('.search-result__grid');
  }

  append(cardModel) {
    this.gridHtmlElement.appendChild(SearchResult.createCard(cardModel));
  }

  update(results) {
    if (!this.gridHtmlElement) {
      return;
    }

    this.removeAll();

    results.forEach((cardModel) => {
      this.append(cardModel);
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

    // TODO: lazy loading
    const img = document.createElement('img');
    if (imageLink) {
      img.src = imageLink;
      img.classList.add('search-result__card-image');
      img.classList.add('search-result__card-image_placeholder');
      img.onload = () => {
        img.classList.remove('search-result__card-image_placeholder');
      };
    } else {
      img.classList.add('search-result__card-image');
      img.classList.add('search-result__card-image_placeholder');
    }
    cardEl.appendChild(img);

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

    body.appendChild(cardTitle);
    body.appendChild(text);

    cardEl.appendChild(body);
    cardEl.appendChild(footer);

    return cardEl;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const searchResult = new SearchResult();
