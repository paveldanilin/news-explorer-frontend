import Component from '../component';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);

    const {
      renderer, link, text, hidden,
    } = props;

    this.hidden = hidden || false;
    this.renderer = renderer || null;
    this.link = link || '#';
    this.text = text || '';
  }

  static create(props) {
    return new MenuItem(props);
  }

  getLink() {
    return this.link;
  }

  getText() {
    return this.text;
  }

  show() {
    this.hidden = false;
    return this;
  }

  hide() {
    this.hidden = true;
    return this;
  }

  isHidden() {
    return this.hidden;
  }

  render() {
    if (typeof this.renderer === 'function') {
      return this.callRenderer();
    }

    return `<li>
        <a href="${this.getLink()}">${this.getText()}</a>
    </li>`;
  }

  callRenderer() {
    if (typeof this.renderer !== 'function') {
      throw new Error('Renderer must be function');
    }

    const rendered = this.renderer(this);

    if (rendered === null || rendered === undefined) {
      return '';
    }

    if (rendered instanceof Component) {
      setTimeout(() => {
        rendered.mount(this);
      }, 0);
      return '<li></li>';
    }

    return `<li>${rendered}</li>`;
  }
}
