import Component from '../../component';

export default class TextField extends Component {
  constructor(props) {
    super(props);
    this._placeholder = props.placeholder || '';
  }

  getValue() {
    return this.HtmlElement.value;
  }

  render() {
    return `<input type="text" placeholder="${this._placeholder}">`;
  }
}
