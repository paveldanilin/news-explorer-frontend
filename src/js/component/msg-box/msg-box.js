import Component from '../component';

export default class MsgBox extends Component {
  constructor(props) {
    super(props);
    const {
      title,
      message,
      innerClassList,
      outerClassList,
      headerClassList,
      bodyClassList,
      titleClassList,
      closeIconClassList,
      iconClassList,
    } = props;
    this._title = title || '';
    this._message = message || '';
    this._headerClassList = headerClassList || [];
    this._titleClassList = titleClassList || [];
    this._bodyClassList = bodyClassList || [];
    this._innerClassList = innerClassList || [];
    this._outerClassList = outerClassList || [];
    this._closeIconClassList = closeIconClassList || [];
    this._iconClassList = iconClassList || [];
  }

  static error(title, message, container) {
    return MsgBox.simple(title, message, 'error', container);
  }

  static msg(title, message, container) {
    return MsgBox.simple(title, message, undefined, container);
  }

  static simple(title, message, type, container) {
    const errClassList = ['icon', 'icon_error', 'icon_size_32'];
    let iconClassList = [];

    if (type === 'error') {
      iconClassList = errClassList;
    }

    return MsgBox.create({
      container: container || 'body',
      title,
      message,
      classList: ['dialog-error'],
      iconClassList,
      outerClassList: ['dialog2', 'dialog_style_white', 'dialog_align_center'],
      innerClassList: ['dialog__content', 'dialog__content_border_full'],
      headerClassList: ['dialog__header'],
      titleClassList: ['dialog__header-title'],
      closeIconClassList: ['dialog__close', 'icon', 'icon_size_24', 'icon_close_black'],
      bodyClassList: ['dialog__body'],
      listeners: {
        render: (event) => {
          event.element
            .querySelector('i[name="msgbox-close"]')
            .addEventListener('click', () => event.component.destroy());
        },
      },
    });
  }

  get Message() {
    return this._message;
  }

  get Title() {
    return this._title;
  }

  render() {
    return `<div data-dialog>
                <div name="msgbox-outer-container" class="${this._outerClassList.join(' ')}">
                  <div name="msgbox-inner-container" class="${this._innerClassList.join(' ')}">
                      <div name="msgbox-header" class="${this._headerClassList.join(' ')}">
                          <i class="${this._iconClassList.join(' ')}"></i>
                          <h3 class="${this._titleClassList.join(' ')}">${this._title}</h3>
                          <i name="msgbox-close" class="${this._closeIconClassList.join(' ')}"></i>
                      </div>
                      <div name="msgbox-body" class="${this._bodyClassList.join(' ')}">
                          ${this._message}
                      </div>
                  </div>
                </div>
            </div>`;
  }
}
