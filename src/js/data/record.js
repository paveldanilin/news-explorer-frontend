import UuidGenerator from '../util/uuid-generator';
import ObjectHelper from '../util/object-helper';
import RecordDefinition from './record-definition';

export default class Record {
  constructor(id, definition, data) {
    this.id = id;
    this.definition = null;
    this.data = data || {};

    if (definition instanceof RecordDefinition) {
      this.definition = definition;
    } else if (ObjectHelper.isPlain(definition)) {
      this.definition = RecordDefinition.create(definition);
    } else {
      throw new Error('Expected instance of RecordDefinition');
    }

    const validationErrors = this.definition.validate(this.data);

    if (validationErrors.length > 0) {
      throw new Error(
        `Record validation errors: [${validationErrors.join(',')}].
        Raw data: ${JSON.stringify(this.data)}`,
      );
    }
  }

  static create(definition, data, id) {
    return new Record(id || UuidGenerator.generate(), definition, data);
  }

  get Id() {
    return this.id;
  }

  /**
   * Returns raw data
   * @returns {*|{}}
   */
  get Data() {
    return this.data;
  }

  /**
   * Returns array of field definitions
   * @returns {RecordDefinition}
   */
  get Definition() {
    return this.definition;
  }

  /**
   * Returns raw data by fieldName
   * @param fieldName
   * @returns {null|string|number|object|array|undefined}
   */
  get(fieldName) {
    const fieldDef = this.Definition.find(fieldName);
    if (fieldDef === undefined) {
      Record.UnknownFieldError(fieldName, this);
    }
    return ObjectHelper.find(this.data, fieldDef.Mapping);
  }

  /**
   * Defines new value for raw data
   * @param fieldName
   * @param value
   * @returns {boolean}
   */
  set(fieldName, value) {
    const fieldDef = this.Definition.find(fieldName);
    if (fieldDef === undefined) {
      Record.UnknownFieldError(fieldName, this);
    }
    return ObjectHelper.setVal(this.data, value, fieldDef.Mapping);
  }

  static UnknownFieldError(fieldName, record) {
    throw new Error(
      `Unknown field "${fieldName}", please add it to record definition.
         Record fields: [${record.Definition.map((item) => item.Name).join(',')}]`,
    );
  }
}
