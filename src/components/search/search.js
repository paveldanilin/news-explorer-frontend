
class Search {
  constructor() {
    this.btnHtmlElement = document.querySelector('.search__button').querySelector('button') || null;
    this.inputHtmlElement = document.querySelector('.search__textbox').querySelector('input') || null;
    this.onSearchCallback = null;
    this.enterListener();
  }

  registerCallback(callback) {
    if (!this.btnHtmlElement || !this.inputHtmlElement) {
      return;
    }
    this.onSearchCallback = callback;
    this.btnHtmlElement.addEventListener('click', () => {
      const searchText = this.inputHtmlElement.value || null;
      if (searchText === null || searchText.length === 0) {
        return;
      }
      this.onSearchCallback(searchText);
    });
  }

  enterListener() {
    if (!this.inputHtmlElement) {
      return;
    }
    this.inputHtmlElement.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 && this.onSearchCallback) {
        const searchText = this.inputHtmlElement.value || null;
        if (searchText === null || searchText.length === 0) {
          return;
        }
        this.onSearchCallback(searchText);
      }
    });
  }
}

export const search = new Search();
