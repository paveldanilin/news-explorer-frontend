import MenuItem from './menu-item';
import ObjectHelper from '../../util/object-helper';
import Component from '../component';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    const {
      items, renderer, itemClassList, itemSelectedClass,
    } = props;

    this._itemRenderer = renderer || null;
    this._itemClassList = itemClassList || [];
    this._itemSelectedClass = itemSelectedClass || null;

    this.setItems(items || []);
  }

  getItem(index) {
    return this._items[index] || null;
  }

  setItems(items) {
    this._items = items.map((item) => this.processItem(item));
  }

  getItems() {
    return this._items;
  }

  findById(id) {
    return this._items.find((menuItem) => menuItem.Id === id) || null;
  }

  findByName(name) {
    return this._items.find((menuItem) => menuItem.Name === name) || null;
  }

  getItemSelectedClass() {
    return this._itemSelectedClass;
  }

  render() {
    this.mountItems();
    return '<ul></ul>';
  }

  mountItems() {
    this._items.forEach((menuItem) => {
      menuItem.mount(this);
    });
  }

  processItem(item) {
    // -- MenuItem
    if (item instanceof MenuItem) {
      return item;
    }
    // -- JSON
    if (ObjectHelper.isPlain(item)) {
      if (item.renderer === undefined) {
        // eslint-disable-next-line no-param-reassign
        item.renderer = this._itemRenderer;
      }
      if (item.classList === undefined) {
        // eslint-disable-next-line no-param-reassign
        item.classList = this._itemClassList;
      } else {
        this._itemClassList.forEach((itemCls) => {
          if (item.classList.includes(itemCls) === false) {
            item.classList.push(itemCls);
          }
        });
      }
      return MenuItem.create(item);
    }
    throw new Error('Expected instance of MenuItem or plain object');
  }
}
