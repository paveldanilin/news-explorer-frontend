import Record from './record';
import ObjectHelper from '../util/object-helper';
import UuidGenerator from '../util/uuid-generator';
import RecordDefinition from './record-definition';
import Observable from '../component/observable';
import DataProxy from './data-proxy';

export default class Store extends Observable {
  constructor(data, recordDefinition, dataProxy, listeners, autoload) {
    super();
    if (!(recordDefinition instanceof RecordDefinition)) {
      throw new Error('Expected instance of RecordDefinition');
    }

    this.recordDefinition = recordDefinition;
    this.records = [];
    this.setRecords(data || []);
    this.dataProxy = dataProxy || null;

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
      data, listeners, autoload,
    } = pros;
    let { recordDefinition } = pros;
    let { dataProxy } = pros;

    if (Array.isArray(recordDefinition)) {
      recordDefinition = RecordDefinition.create(recordDefinition);
    }

    if (!(dataProxy instanceof DataProxy) && dataProxy !== undefined) {
      dataProxy = DataProxy.create(dataProxy);
    }

    return new Store(data || [], recordDefinition, dataProxy, listeners, autoload);
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
   * @returns {Array.<Record>}
   */
  get Records() {
    return this.records;
  }

  setRecords(records) {
    if (!Array.isArray(records)) {
      throw new Error('Expected array of records');
    }
    this.records = records.map((item, index) => {
      if (item instanceof Record) {
        return item;
      }
      if (ObjectHelper.isPlain(item)) {
        return Record.create(this.recordDefinition, item, UuidGenerator.generate());
      }
      throw new Error(`Expected plain object or instance of Record. index=${index}`);
    });
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

  reload() {
    if (this.DataProxy) {
      this.DataProxy.load();
    }
  }
}
