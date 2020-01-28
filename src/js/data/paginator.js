export default class Paginator {
  constructor(props) {
    const { pageSize, mode } = props;
    this._pageSize = pageSize || 10;
    this._mode = mode || Paginator.MODE_PAGE;
  }

  static create(props) {
    return new Paginator(props);
  }

  static get MODE_PAGE() {
    return 'page';
  }

  static get MODE_APPEND() {
    return 'append';
  }

  get Mode() {
    return this._mode;
  }

  get PageSize() {
    return this._pageSize;
  }

  paginate(items, pageNumber, mode) {
    if (!Array.isArray(items)) {
      throw new Error('Expected an array');
    }
    if (items.length === 0) {
      return [];
    }

    if ((mode || this._mode) === Paginator.MODE_APPEND) {
      return items.slice(0, pageNumber * this._pageSize);
    }

    // Paginator.MODE_PAGE
    const startOffset = pageNumber - 1;
    return items.slice(
      startOffset * this._pageSize,
      (startOffset + 1) * this._pageSize,
    );
  }

  getPageCount(items) {
    if (!Array.isArray(items)) {
      throw new Error('Expected an array');
    }
    return Math.ceil(items.length / this._pageSize);
  }
}
