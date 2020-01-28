import '../../../components/locker/locker.css';
import Component from '../component';
import Element from '../element';

export default class Locker extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this._text = props.text || '';
    this._spinnerClassList = props.spinnerClassList || [];

    this.on('afterrender', () => {
      if (this.ContainerHtmlElement.tagName.toLowerCase() !== 'body') {
        const containerRect = Element.wrap(this.ContainerHtmlElement).getRect();
        Element.wrap(this.HtmlElement)
          .posStyle('absolute')
          .pos(containerRect.top, containerRect.left)
          .size(containerRect.width, containerRect.height);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return `<div class="locker">
                  <div class="locker__container">
                      <div class="locker__info">
                          <span class="${this._spinnerClassList.join(' ')}"></span>${this._text}
                      </div>
                  </div>
                </div>
            `;
  }
}
