import Record from './record';
import ObjectHelper from '../util/object-helper';
import UuidGenerator from '../util/uuid-generator';
import RecordDefinition from './record-definition';
import Observable from '../component/observable';
import DataProxy from './data-proxy';
import Paginator from './paginator';

export default class Store extends Observable {
  constructor(
    data, recordDefinition, dataProxy, listeners, autoload, dataRoot, pageSize, pageMode,
  ) {
    super();
    if (!(recordDefinition instanceof RecordDefinition)) {
      throw new Error('Expected instance of RecordDefinition');
    }

    this.recordDefinition = recordDefinition;
    this.dataRoot = dataRoot || null;
    this.records = [];
    this.setRecords(data || []);
    this.dataProxy = dataProxy || null;
    if (pageSize === undefined || pageSize === null) {
      this.paginator = null;
    } else {
      this.paginator = Paginator.create({ pageSize, mode: pageMode });
    }
    this.pageNumber = 1;

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
    const {
      data, listeners, autoload, dataRoot, pageSize, pageMode,
    } = pros;
    let { recordDefinition } = pros;
    let { dataProxy } = pros;

    if (Array.isArray(recordDefinition)) {
      recordDefinition = RecordDefinition.create(recordDefinition);
    }

    if (!(dataProxy instanceof DataProxy) && dataProxy !== undefined) {
      dataProxy = DataProxy.create(dataProxy);
    }

    return new Store(
      data || [],
      recordDefinition,
      dataProxy,
      listeners,
      autoload,
      dataRoot,
      pageSize,
      pageMode,
    );
  }

  /**
   * @returns {?DataProxy}
   */
  get DataProxy() {
    return this.dataProxy;
  }

  /**
   * @returns {RecordDefinition}
   */
  get RecordDefinition() {
    return this.recordDefinition;
  }

  /**
   * Returns array of paginated records (if pagination is enabled) or all records
   * @returns {Array.<Record>}
   */
  get Records() {
    if (this.paginator) {
      return this.paginator.paginate(this.records, this.pageNumber);
    }
    return this.records;
  }

  /**
   * Returns all records
   * @returns {Array.<Record>}
   */
  get All() {
    return this.records;
  }

  /**
   * @returns {Array.<Record>}
   */
  get CurrentPageRecords() {
    if (this.paginator) {
      return this.paginator.paginate(this.records, this.pageNumber, Paginator.MODE_PAGE);
    }
    return this.records;
  }

  /**
   * @returns {null|Paginator}
   */
  get Paginator() {
    return this.paginator;
  }

  getPageCount() {
    if (this.paginator) {
      return this.paginator.getPageCount(this.records);
    }
    return 1;
  }

  nextPage() {
    if (this.pageNumber + 1 <= this.getPageCount()) {
      this.pageNumber += 1;
    }
    return this.pageNumber;
  }

  prevPage() {
    if (this.pageNumber - 1 !== 0) {
      this.pageNumber -= 1;
    }
    return this.pageNumber;
  }

  getCurrentPage() {
    return this.pageNumber;
  }

  count() {
    return this.records.length;
  }

  setRecords(records) {
    let inRecords = records;
    if (this.dataRoot !== null && this.dataRoot !== undefined && ObjectHelper.isPlain(inRecords)) {
      inRecords = ObjectHelper.find(inRecords, this.dataRoot, '.');
    }
    if (!Array.isArray(inRecords)) {
      throw new Error('Expected array of records');
    }
    this.records = inRecords.map((item, index) => {
      if (item instanceof Record) {
        return item;
      }
      if (ObjectHelper.isPlain(item)) {
        return Record.create(this.recordDefinition, item, UuidGenerator.generate());
      }
      throw new Error(`Expected plain object or instance of Record. index=${index}`);
    });
    if (this.paginator) {
      this.pageNumber = 1;
    }
  }

  add(data) {
    if (data instanceof Record) {
      this.addRecord(data);
      return;
    }
    if (ObjectHelper.isPlain(data)) {
      this.addRecord(Record.create(this.recordDefinition, data, UuidGenerator.generate()));
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
    this.records.push(record);
  }

  get(id) {
    return this.records[id] || undefined;
  }

  findBy(fieldName, predicate) {
    if (this.RecordDefinition.has(fieldName) === false) {
      return [];
    }
    if (typeof predicate === 'function') {
      throw new Error('Predicate must be pure JS function');
    }
    return this.records.filter((record) => predicate(record.get(fieldName)));
  }

  reload(url, queryParams) {
    if (this.DataProxy) {
      this.DataProxy.load(url, queryParams);
    }
  }
}
