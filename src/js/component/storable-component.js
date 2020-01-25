import Store from '../data/store';
import ObjectHelper from '../util/object-helper';
import Component from './component';

export default class StorableComponent extends Component {
  constructor(props) {
    super(props);

    const { store } = props;

    if (store) {
      if (store instanceof Store) {
        this.store = store;
      } else if (ObjectHelper.isPlain(store)) {
        this.store = Store.create(store);
      } else {
        throw new Error('Expected instance of Store or object store definition');
      }
    } else {
      throw new Error('Expected instance of Store or object store definition');
    }

    this.store.on('load', () => {
      this.refresh();
    });
  }

  /**
   * @returns {Store}
   */
  get Store() {
    return this.store;
  }

  removeAll() {
    this.Store.setRecords([]);
    return super.removeAll();
  }
}
