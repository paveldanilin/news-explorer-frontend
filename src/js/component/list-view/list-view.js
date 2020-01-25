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

    this.itemListeners = itemListeners || {};
    this.itemLabelField = itemLabelField || null;
    this.itemRenderer = itemRenderer || null;
    this.itemClassList = itemClassList || [];

    if (this.itemRenderer !== null && typeof this.itemRenderer !== 'function') {
      throw new Error('Item tenderer must be a function');
    }

    if (typeof this.itemLabelField !== 'string' && typeof this.itemRenderer !== 'function') {
      throw new Error('You should define either itemLabelField or item renderer function');
    }

    if (typeof this.itemLabelField === 'string' && !this.Store.RecordDefinition.has(this.itemLabelField)) {
      throw new Error(`Value field "${this.itemLabelField}" not found in RecordDefinition`);
    }
  }

  refresh() {
    if (this.Store.Paginator && this.Store.Paginator.Mode === Paginator.MODE_APPEND) {
      // Append only new data
      this.Store.CurrentPageRecords.forEach((record) => {
        const rendered = this.itemRenderer(record);
        if (rendered instanceof Component) {
          rendered.mount(
            ListViewItem
              .create({ classList: this.itemClassList })
              .attachListeners(this.itemListeners)
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
    if (this.itemLabelField) {
      this.Store.Records.forEach((record) => {
        ListViewItem
          .create({
            classList: this.itemClassList,
          })
          .attachListeners(this.itemListeners)
          .mount(this)
          .on('render', (event) => {
            // eslint-disable-next-line no-param-reassign
            event.element.textContent = record.get(this.itemLabelField);
          });
      });
      return;
    }

    this.Store.Records.forEach((record) => {
      const rendered = this.itemRenderer(record);
      if (rendered instanceof Component) {
        rendered.mount(
          ListViewItem
            .create({ classList: this.itemClassList })
            .attachListeners(this.itemListeners)
            .mount(this),
        );
      }
    });
  }
}
