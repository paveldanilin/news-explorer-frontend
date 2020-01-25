import Component from '../../component';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.setText((props.text || '').trim());
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
    if (this.HtmlElement) {
      this.HtmlElement.textContent = text;
    }
    return this;
  }

  render() {
    return `<button>${this.getText()}</button>`;
  }
}
