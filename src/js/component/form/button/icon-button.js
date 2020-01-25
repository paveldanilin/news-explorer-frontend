import Button from './button';

export default class IconButton extends Button {
  constructor(props) {
    super(props);
    this.setIconClassList(props.iconClassList || []);
    this.setTextAlign(props.textAlign || IconButton.TEXT_ALIGN_RIGHT);
  }

  static get TEXT_ALIGN_LEFT() {
    return 'left';
  }

  static get TEXT_ALIGN_RIGHT() {
    return 'right';
  }

  setIconClassList(classList) {
    this.iconClassList = classList;
  }

  getIconClassList() {
    return this.iconClassList;
  }

  setTextAlign(align) {
    const textAlign = align.toLowerCase();
    if (textAlign !== IconButton.TEXT_ALIGN_RIGHT && textAlign !== IconButton.TEXT_ALIGN_LEFT) {
      throw new Error(`Bad text align value "${align}"`);
    }
    this.textAlign = textAlign;
  }

  getTextAlign() {
    return this.textAlign;
  }

  setText(text) {
    this.text = text;
    if (this.HtmlElement) {
      this.HtmlElement.querySelector('span[name="icon-button-text"]').textContent = text;
    }
    return this;
  }

  render() {
    if (this.getTextAlign() === IconButton.TEXT_ALIGN_LEFT) {
      return `<button>
                <span name="icon-button-text">${this.getText()}</span>
                <i class="${this.getIconClassList().join(' ')}"></i>
             </button>`;
    }
    return `<button>
                <i class="${this.getIconClassList().join(' ')}"></i>
                <span name="icon-button-text">${this.getText()}</span>
            </button>`;
  }
}
