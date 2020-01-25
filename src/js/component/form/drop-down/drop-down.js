import StorableComponent from '../../storable-component';

export default class DropDown extends StorableComponent {
  constructor(props) {
    super(props);

    const {
      valueField, descriptionField,
    } = props;

    this.valueField = valueField;
    this.descriptionField = descriptionField;

    if (!this.Store.RecordDefinition.has(this.valueField)) {
      throw new Error(`Value field "${this.valueField}" not found in RecordDefinition`);
    }

    if (!this.Store.RecordDefinition.has(this.descriptionField)) {
      throw new Error(`Description field "${this.descriptionField}" not found in RecordDefinition`);
    }
  }

  getSelectedIndex() {
    return this.HtmlElement.selectedIndex || -1;
  }

  getSelectedRecord() {
    const index = this.getSelectedIndex();
    if (index < 0) {
      return null;
    }
    return this.Store.get(index);
  }

  /**
   * @returns {null|{record: Record, index: number, htmlElement: HTMLElement}}
   */
  getSelected() {
    const selectedRecord = this.getSelectedRecord();
    if (selectedRecord === null) {
      return null;
    }
    return {
      htmlElement: document.getElementById(selectedRecord.Id),
      record: selectedRecord,
      index: this.getSelectedIndex(),
    };
  }

  render() {
    return `<select>${this.Store.Records.map((record) => this.renderItem(record)).join('')}</select>`;
  }

  renderItem(record) {
    return `<option id="${record.Id}" value="${record.get(this.valueField)}">
                ${record.get(this.descriptionField)}
            </option>`;
  }
}
