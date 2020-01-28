import StorableComponent from '../storable-component';
import ListViewItem from './list-view-item';
import Component from '../component';
import Paginator from '../../data/paginator';

export default class ListView extends StorableComponent {
  constructor(props) {
    super(props);

    const {
      itemRenderer, itemClassList, itemLabelField, itemListeners,
    } = props;

    this._itemListeners = itemListeners || {};
    this._itemLabelField = itemLabelField || null;
    this._itemRenderer = itemRenderer || null;
    this._itemClassList = itemClassList || [];

    if (this._itemRenderer !== null && typeof this._itemRenderer !== 'function') {
      throw new Error('Item tenderer must be a function');
    }

    if (typeof this._itemLabelField !== 'string' && typeof this._itemRenderer !== 'function') {
      throw new Error('You should define either itemLabelField or item renderer function');
    }

    if (typeof this._itemLabelField === 'string' && !this.Store.RecordDefinition.has(this._itemLabelField)) {
      throw new Error(`Value field "${this._itemLabelField}" not found in RecordDefinition`);
    }
  }

  refresh() {
    if (this.Store.Paginator && this.Store.Paginator.Mode === Paginator.MODE_APPEND) {
      // Append only new data
      this.Store.CurrentPageRecords.forEach((record) => {
        const rendered = this._itemRenderer(record);
        if (rendered instanceof Component) {
          rendered.mount(
            ListViewItem
              .create({ classList: this._itemClassList })
              .attachListeners(this._itemListeners)
              .mount(this),
          );
        }
      });
    } else {
      // Full redraw
      super.refresh();
    }
  }

  render() {
    this.mountItems();
    return '<ul></ul>';
  }

  mountItems() {
    if (this._itemLabelField) {
      this.Store.Records.forEach((record) => {
        ListViewItem
          .create({
            classList: this._itemClassList,
          })
          .attachListeners(this._itemListeners)
          .mount(this)
          .on('render', (event) => {
            // eslint-disable-next-line no-param-reassign
            event.element.textContent = record.get(this._itemLabelField);
          });
      });
      return;
    }

    this.Store.Records.forEach((record) => {
      const rendered = this._itemRenderer(record);
      if (rendered instanceof Component) {
        rendered.mount(
          ListViewItem
            .create({ classList: this._itemClassList })
            .attachListeners(this._itemListeners)
            .mount(this),
        );
      }
    });
  }
}
