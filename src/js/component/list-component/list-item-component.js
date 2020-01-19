import BaseComponent from '../base-component/base-component';

export default class ListItemComponent extends BaseComponent {
  constructor(props) {
    super('', props.data || {});
    this.classList = props.classList || [];
    this.renderer = props.renderer || undefined;
    this.listeners = props.listeners || {};
  }

  onInit() {
    Object
      .keys(this.listeners)
      .forEach((eventName) => {
        this.listen(`#${this.Id}`, eventName, this.listeners[eventName]);
      });
  }

  onRender() {
    let content = '';
    if (typeof this.renderer === 'function') {
      content = this.renderer(this.State, this.classList);
    } else {
      content = this.State.text;
    }
    return `<li id="${this.Id}" class="${this.classList.join(' ')}">${content}</li>`;
  }
}
