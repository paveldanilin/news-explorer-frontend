import Element from './js/component/base-component/element';
import Observable from './js/component/base-component/observable';

export default class Component extends Observable {
  constructor(props) {
    super();

    this.htmlElement = null;
    this.name = props.name || null;
    this.id = props.id || Component.genId();
    this.classList = props.classList || [];
    this.listeners = props.listeners || {};
    this.domEvents = ['click', 'mouseover', 'mouseout', 'keyup', 'keydown'];
    this.mounted = false;
  }

  getId() {
    return this.id;
  }

  getHtmlElement() {
    return this.htmlElement;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    throw new Error('You must implement render function');
  }

  mountTo(container) {
    if (this.mounted) {
      throw new Error('Component already mounted');
    }

    setTimeout(() => {
      const containerSelector = container || 'body';
      let containerElement = null;
      if (typeof containerSelector === 'string') {
        containerElement = document.querySelector(containerSelector);
      }
      if (containerElement instanceof HTMLElement) {
        this.htmlElement = this.$render();
        containerElement.appendChild(this.htmlElement);

        Component.instances[this.getId()] = this;

        Object
          .keys(this.listeners)
          .forEach((eventName) => this.on(eventName, this.listeners[eventName]));

        this.mounted = true;

        this.fireEvent('mount', {
          component: this,
          parentElement: containerElement,
        });
        return;
      }
      throw new Error('Could not render component to unresolved container');
    }, 0);
  }

  refresh() {
    if (!this.htmlElement) {
      return;
    }
    this.htmlElement.parentNode.replaceChild(this.$render(), this.htmlElement);
    this.htmlElement = document.getElementById(this.getId());
  }

  $render() {
    const el = Element.create(this.render());

    el.setAttribute('id', this.id);
    if (this.name) {
      el.setAttribute('name', this.name);
    }

    Object
      .keys(this.listeners)
      .forEach((eventName) => {
        if (this.domEvents.includes(eventName)) {
          el.addEventListener(eventName, (event) => {
            this.fireEvent(eventName, {
              component: this,
              domEvent: event,
            });
          });
        }
      });

    this.classList.forEach((cssClass) => el.classList.add(cssClass));

    setTimeout(() => this.fireEvent('render', { component: this }), 0);

    return el;
  }

  static genId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-mixed-operators,no-bitwise
      const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static getCmp(id) {
    return Component.instances[id] || null;
  }
}

Component.instances = [];
