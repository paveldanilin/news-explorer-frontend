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
    this.title = title || '';
    this.message = message || '';
    this.headerClassList = headerClassList || [];
    this.titleClassList = titleClassList || [];
    this.bodyClassList = bodyClassList || [];
    this.innerClassList = innerClassList || [];
    this.outerClassList = outerClassList || [];
    this.closeIconClassList = closeIconClassList || [];
    this.iconClassList = iconClassList || [];
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
    return this.message;
  }

  get Title() {
    return this.title;
  }

  render() {
    return `<div data-dialog>
                <div name="msgbox-outer-container" class="${this.outerClassList.join(' ')}">
                  <div name="msgbox-inner-container" class="${this.innerClassList.join(' ')}">
                      <div name="msgbox-header" class="${this.headerClassList.join(' ')}">
                          <i class="${this.iconClassList.join(' ')}"></i>
                          <h3 class="${this.titleClassList.join(' ')}">${this.title}</h3>
                          <i name="msgbox-close" class="${this.closeIconClassList.join(' ')}"></i>
                      </div>
                      <div name="msgbox-body" class="${this.bodyClassList.join(' ')}">
                          ${this.message}
                      </div>
                  </div>
                </div>
            </div>`;
  }
}
