import Component from '../component';

export default class Picture extends Component {
  constructor(props) {
    super(props);

    const { alt, src, placeholder } = props;

    this.shadowImage = new Image();
    this.shadowImage.alt = alt || '';
    this.shadowImage.src = src || '';

    this.shadowPlaceholder = new Image();
    this.shadowPlaceholder.src = placeholder || '';
    this.shadowPlaceholder.alt = alt || '';

    this.shadowImage.onerror = () => {
      setTimeout(() => this.replaceElement(this.shadowPlaceholder, true), 0);
    };
    this.shadowImage.onload = () => {
      setTimeout(() => this.replaceElement(this.shadowImage, true), 0);
    };
  }

  get Src() {
    return this.src;
  }

  set Src(src) {
    this.src = src;
    this.shadowImage.src = src;
    this.replaceElement(this.shadowPlaceholder, true);
  }

  get Placeholder() {
    return this.shadowPlaceholder.src;
  }

  get Alt() {
    return this.alt;
  }

  set Alt(alt) {
    this.alt = alt;
    this.shadowImage.alt = alt;
    this.shadowPlaceholder.alt = alt;
  }

  render() {
    return `<img src="${this.shadowPlaceholder.src}" alt=${this.alt}>`;
  }
}
