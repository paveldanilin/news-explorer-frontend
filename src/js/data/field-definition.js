export default class FieldDefinition {
  constructor(name, mapping, type) {
    this.name = name;
    this.mapping = mapping || name;
    this.type = type || FieldDefinition.TYPE_AUTO;
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
    const { name, mapping, type } = definition;
    return new FieldDefinition(name, mapping, type);
  }

  /**
   * @returns {string}
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns {string}
   */
  get Mapping() {
    return this.mapping;
  }

  /**
   * @returns {string}
   */
  get Type() {
    return this.type;
  }

  isEqual(fieldDefinition) {
    if (!(fieldDefinition instanceof FieldDefinition)) {
      return false;
    }
    return fieldDefinition.Mapping === this.Mapping
      && fieldDefinition.Name === this.Name
      && fieldDefinition.Type === this.Type;
  }
}
