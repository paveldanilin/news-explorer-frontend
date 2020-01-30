import Component from '../component';

export default class Picture extends Component {
  constructor(props) {
    super(props);

    const { alt, src, placeholder } = props;

    this._shadowImage = new Image();
    this._shadowImage.alt = alt || '';
    this._shadowImage.src = src || '';

    this._shadowPlaceholder = new Image();
    this._shadowPlaceholder.src = placeholder || '';
    this._shadowPlaceholder.alt = alt || '';

    this._shadowImage.onerror = () => {
      setTimeout(() => this.replaceElement(this._shadowPlaceholder, true), 0);
    };
    this._shadowImage.onload = () => {
      setTimeout(() => this.replaceElement(this._shadowImage, true), 0);
    };
  }

  get Src() {
    return this._src;
  }

  set Src(src) {
    this._src = src;
    this._shadowImage.src = src;
    this.replaceElement(this._shadowPlaceholder, true);
  }

  get Placeholder() {
    return this._shadowPlaceholder.src;
  }

  get Alt() {
    return this._alt;
  }

  set Alt(alt) {
    this._alt = alt;
    this._shadowImage.alt = alt;
    this._shadowPlaceholder.alt = alt;
  }

  render() {
    return `<img src="${this._shadowPlaceholder.src}" alt=${this.Alt}>`;
  }
}
