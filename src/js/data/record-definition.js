import ObjectHelper from '../util/object-helper';
import FieldDefinition from './field-definition';

export default class RecordDefinition {
  constructor(definition) {
    if (!Array.isArray(definition)) {
      throw new Error('Expected array of definition');
    }
    this.definition = definition.map((def) => {
      if (ObjectHelper.isPlain(def)) {
        return FieldDefinition.create(def);
      }
      return def;
    });
    this.definition.forEach((def, index) => {
      if (!(def instanceof FieldDefinition)) {
        throw new Error(`Expected instance of Definition. index=${index}`);
      }
    });
  }

  static create(definition) {
    return new RecordDefinition(definition);
  }

  /**
   * @returns {Array.<FieldDefinition>}
   */
  get Definition() {
    return this.definition;
  }

  get(id) {
    return this.definition[id] || null;
  }

  /**
   * @param fieldName
   * @returns {FieldDefinition|undefined}
   */
  find(fieldName) {
    return this.Definition.find((item) => item.Name === fieldName);
  }

  has(fieldName) {
    return this.find(fieldName) !== undefined;
  }

  isEqual(recordDefinition) {
    if (!(recordDefinition instanceof RecordDefinition)) {
      return false;
    }
    if (this.Definition.length !== recordDefinition.Definition.length) {
      return false;
    }
    for (let i = 0; i < recordDefinition.length; i += 1) {
      const inputFieldDef = recordDefinition.get(i);
      const fieldDef = this.find(inputFieldDef.Name);
      if (!fieldDef) {
        return false;
      }
      if (!fieldDef.isEqual(inputFieldDef)) {
        return false;
      }
    }
    return true;
  }

  validate(data) {
    const errors = [];
    this.definition.forEach((def) => {
      const field = ObjectHelper.find(data, def.Mapping);
      if (field === undefined) {
        errors.push(`Not found field with name "${def.Name}" in raw data`);
      }
    });
    return errors;
  }
}
