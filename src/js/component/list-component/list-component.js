import BaseComponent from '../base-component/base-component';
import ListItemComponent from './list-item-component';

export default class ListComponent extends BaseComponent {
  constructor(props) {
    super(props.selector || undefined, {
      items: [],
    });
    this.classList = props.classList || [];
    if (props.items || Array.isArray(props.items)) {
      props.items.forEach((item) => this.addItem(item));
    }
  }

  addItem(item) {
    if (!(item instanceof ListItemComponent)) {
      throw new Error('Expected instance of ListItemComponent');
    }
    this.State.items.push(item);
  }

  getItems() {
    return this.State.items;
  }

  hasItem(id) {
    return this.getItem(id) !== null;
  }

  getItem(id) {
    return this.State.items[id] || null;
  }

  onRender() {
    return `<ul class="${this.classList.join(' ')}">
        ${this.State.items.map((item) => item.onRender()).join(' ')}
    </ul>`;
  }
}
