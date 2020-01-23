import Component from '../component';

export default class Button extends Component {
  constructor(props) {
    super(props);

    const { text, image } = props;
    this.setText(text || '');
    this.setImage(image || null);
  }

  static create(props) {
    return new Button(props);
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    this.image = image;
  }

  render() {
    if (this.image) {
      return `<input type="image" src="${this.getImage()}">`;
    }
    return `<button>${this.getText()}</button>`;
  }
}
