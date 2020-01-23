import Component from '../component';

export default class Button extends Component {
  constructor(props, text) {
    super(props);
    this.setText(text || '');
  }

  static create(props) {
    const { text } = props;
    return new Button(props, text);
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
  }

  render() {
    return `<button>${this.text}</button>`;
  }
}
