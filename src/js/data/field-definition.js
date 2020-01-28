export default class FieldDefinition {
  constructor(name, mapping, type, mandatory) {
    this._name = name;
    this._mapping = mapping || name;
    this._type = type || FieldDefinition.TYPE_AUTO;
    this._madatory = mandatory || false;
  }

  static get TYPE_AUTO() {
    return 'auto';
  }

  static get TYPE_STRING() {
    return 'string';
  }

  static get TYPE_INT() {
    return 'int';
  }

  static get TYPE_FLOAT() {
    return 'float';
  }

  static get TYPE_BOOL() {
    return 'boolean';
  }

  static get TYPE_DATE() {
    return 'date';
  }

  static create(definition) {
    const {
      name, mapping, type, mandatory,
    } = definition;
    return new FieldDefinition(name, mapping, type, mandatory);
  }

  /**
   * @returns {string}
   */
  get Name() {
    return this._name;
  }

  /**
   * @returns {string}
   */
  get Mapping() {
    return this._mapping;
  }

  /**
   * @returns {string}
   */
  get Type() {
    return this._type;
  }

  /**
   * @returns {boolean}
   */
  get Mandatory() {
    return this._madatory;
  }

  isEqual(fieldDefinition) {
    if (!(fieldDefinition instanceof FieldDefinition)) {
      return false;
    }
    return fieldDefinition.Mapping === this.Mapping
      && fieldDefinition.Name === this.Name
      && fieldDefinition.Type === this.Type
      && fieldDefinition.Mandatory === this.Mandatory;
  }
}
