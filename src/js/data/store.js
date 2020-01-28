import Record from './record';
import ObjectHelper from '../util/object-helper';
import UuidGenerator from '../util/uuid-generator';
import RecordDefinition from './record-definition';
import Observable from '../component/observable';
import DataProxy from './data-proxy';
import Paginator from './paginator';

export default class Store extends Observable {
  constructor({
    data, recordDefinition, dataProxy, listeners, autoload, dataRoot, pageSize, pageMode,
  }) {
    super();

    if (!(recordDefinition instanceof RecordDefinition)) {
      throw new Error('Expected instance of RecordDefinition');
    }

    this._recordDefinition = recordDefinition;
    this._dataRoot = dataRoot || null;
    this._records = [];
    this.setRecords(data || []);
    this._dataProxy = dataProxy || null;
    if (pageSize === undefined || pageSize === null) {
      this._paginator = null;
    } else {
      this._paginator = Paginator.create({ pageSize, mode: pageMode });
    }
    this._pageNumber = 1;

    const eventListeners = listeners || [];
    Object
      .keys(eventListeners)
      .forEach((eventName) => this.on(eventName, eventListeners[eventName]));

    if (this.DataProxy) {
      this.DataProxy.on('load', (rawData) => {
        this.records = [];
        this.setRecords(rawData);
        this.fireEvent('load', this);
      });
      this.DataProxy.on('error', (httpError) => {
        this.fireEvent('error', httpError);
      });
    }

    if (autoload === true) {
      this.reload();
    }
  }

  static create(pros) {
    let { recordDefinition } = pros;
    let { dataProxy } = pros;

    if (Array.isArray(recordDefinition)) {
      recordDefinition = RecordDefinition.create(recordDefinition);
    }

    if (!(dataProxy instanceof DataProxy) && dataProxy !== undefined) {
      dataProxy = DataProxy.create(dataProxy);
    }

    return new Store({ ...pros, ...{ recordDefinition, dataProxy } });
  }

  /**
   * @returns {?DataProxy}
   */
  get DataProxy() {
    return this._dataProxy;
  }

  /**
   * @returns {RecordDefinition}
   */
  get RecordDefinition() {
    return this._recordDefinition;
  }

  /**
   * Returns array of paginated records (if pagination is enabled) or all records
   * @returns {Array.<Record>}
   */
  get Records() {
    if (this._paginator) {
      return this._paginator.paginate(this._records, this._pageNumber);
    }
    return this._records;
  }

  /**
   * Returns all records
   * @returns {Array.<Record>}
   */
  get All() {
    return this._records;
  }

  /**
   * @returns {Array.<Record>}
   */
  get CurrentPageRecords() {
    if (this._paginator) {
      return this._paginator.paginate(this._records, this._pageNumber, Paginator.MODE_PAGE);
    }
    return this._records;
  }

  /**
   * @returns {null|Paginator}
   */
  get Paginator() {
    return this._paginator;
  }

  /**
   * @returns {number}
   */
  getPageCount() {
    if (this._paginator) {
      return this._paginator.getPageCount(this._records);
    }
    return 1;
  }

  nextPage() {
    if (this._pageNumber + 1 <= this.getPageCount()) {
      this._pageNumber += 1;
    }
    return this._pageNumber;
  }

  prevPage() {
    if (this._pageNumber - 1 !== 0) {
      this._pageNumber -= 1;
    }
    return this._pageNumber;
  }

  /**
   * @returns {number}
   */
  getCurrentPage() {
    return this._pageNumber;
  }

  count() {
    return this._records.length;
  }

  setRecords(records, mapper) {
    let inRecords = records;

    if (this._dataRoot !== null
      && this._dataRoot !== undefined
      && ObjectHelper.isPlain(inRecords)) {
      inRecords = ObjectHelper.find(inRecords, this._dataRoot, '.');
    }

    if (!Array.isArray(inRecords)) {
      throw new Error('Expected array of records');
    }

    this._records = inRecords.map((item, index) => {
      if (typeof mapper === 'function') {
        return mapper(item, index);
      }
      if (item instanceof Record) {
        return item;
      }
      if (ObjectHelper.isPlain(item)) {
        return Record.create(this._recordDefinition, item, UuidGenerator.generate());
      }
      throw new Error(`Expected plain object or instance of Record. index=${index}`);
    });

    if (this._paginator) {
      this._pageNumber = 1;
    }
  }

  add(data) {
    if (data instanceof Record) {
      this.addRecord(data);
      return;
    }
    if (ObjectHelper.isPlain(data)) {
      this.addRecord(Record.create(this._recordDefinition, data, UuidGenerator.generate()));
      return;
    }
    throw new Error('Expected plain object or instance of Record');
  }

  addRecord(record) {
    if (!(record instanceof Record)) {
      throw new Error('Expected instance of Record');
    }
    if (!this.RecordDefinition.isEqual(record.Definition)) {
      throw new Error('Record definition miss match');
    }
    this._records.push(record);
  }

  get(id) {
    return this._records[id] || undefined;
  }

  findBy(fieldName, predicate) {
    if (this.RecordDefinition.has(fieldName) === false) {
      return [];
    }
    if (typeof predicate === 'function') {
      return this._records.filter(predicate);
    }
    return this._records.filter((record) => record.get(fieldName) === predicate);
  }

  delete(fieldName, predicate) {
    const index = this.findIndexBy(fieldName, predicate);
    if (index === -1) {
      return false;
    }
    this._records.splice(index, 1);
    return true;
  }

  findIndexBy(fieldName, predicate) {
    if (this.RecordDefinition.has(fieldName) === false) {
      return -1;
    }
    if (typeof predicate === 'function') {
      return this._records.findIndex(predicate);
    }
    return this._records.findIndex((record) => record.get(fieldName) === predicate);
  }

  reload(url, queryParams) {
    if (this.DataProxy) {
      this.DataProxy.load(url, queryParams);
    }
  }
}
