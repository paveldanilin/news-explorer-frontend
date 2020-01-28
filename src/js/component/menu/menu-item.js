import Component from '../component';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);

    const {
      renderer, link, text, selected,
    } = props;

    this._selected = selected || false;
    this._renderer = renderer || null;
    this._link = link || '#';
    this._text = text || '';
  }

  static create(props) {
    return new MenuItem(props);
  }

  getLink() {
    if (this._selected) {
      return '#';
    }
    return this._link;
  }

  getText() {
    return this._text;
  }

  render() {
    if (typeof this._renderer === 'function') {
      return this.callRenderer();
    }

    return `<li class="${this.getSelectedClass()}">
        <a href="${this.getLink()}">${this.getText()}</a>
    </li>`;
  }

  getSelectedClass() {
    if (this.ParentComponent && this._selected) {
      return this.ParentComponent.getItemSelectedClass();
    }
    return '';
  }

  callRenderer() {
    if (typeof this._renderer !== 'function') {
      throw new Error('Renderer must be a function');
    }

    const rendered = this._renderer(this);

    if (rendered === null || rendered === undefined) {
      return '';
    }

    if (rendered instanceof Component) {
      rendered.mount(this);
      return '<li></li>';
    }

    return `<li>${rendered}</li>`;
  }
}
