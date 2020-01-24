import Component from '../component';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);

    const {
      renderer, link, text, selected,
    } = props;

    this.selected = selected || false;
    this.renderer = renderer || null;
    this.link = link || '#';
    this.text = text || '';
  }

  static create(props) {
    return new MenuItem(props);
  }

  getLink() {
    if (this.selected) {
      return '#';
    }
    return this.link;
  }

  getText() {
    return this.text;
  }

  render() {
    if (typeof this.renderer === 'function') {
      return this.callRenderer();
    }

    return `<li class="${this.getSelectedClass()}">
        <a href="${this.getLink()}">${this.getText()}</a>
    </li>`;
  }

  getSelectedClass() {
    if (this.ParentComponent && this.selected) {
      return this.ParentComponent.getItemSelectedClass();
    }
    return '';
  }

  callRenderer() {
    if (typeof this.renderer !== 'function') {
      throw new Error('Renderer must be a function');
    }

    const rendered = this.renderer(this);

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
