export default class Paginator {
  constructor(props) {
    const { pageSize, mode } = props;
    this.pageSize = pageSize || 10;
    this.mode = mode || Paginator.MODE_PAGE;
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
    return this.mode;
  }

  get PageSize() {
    return this.pageSize;
  }

  paginate(items, pageNumber, mode) {
    if (!Array.isArray(items)) {
      throw new Error('Expected an array');
    }
    if (items.length === 0) {
      return [];
    }

    if ((mode || this.mode) === Paginator.MODE_APPEND) {
      return items.slice(0, pageNumber * this.pageSize);
    }

    // Paginator.MODE_PAGE
    const startOffset = pageNumber - 1;
    return items.slice(
      startOffset * this.pageSize,
      (startOffset + 1) * this.pageSize,
    );
  }

  getPageCount(items) {
    if (!Array.isArray(items)) {
      throw new Error('Expected an array');
    }
    return Math.ceil(items.length / this.pageSize);
  }
}
