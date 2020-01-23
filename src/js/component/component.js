import Element from './element';
import Observable from './observable';
import UuidGenerator from '../util/uuid-generator';

export default class Component extends Observable {
  constructor(props) {
    super();

    this.htmlElement = null;
    this.name = props.name || null;
    this.id = props.id || UuidGenerator.generate();
    this.classList = props.classList || [];
    this.listeners = props.listeners || {};
    this.domEvents = ['click', 'mouseover', 'mouseout', 'keyup', 'keydown', 'change', 'blur', 'dblclick', 'focus'];
    this.mounted = false;
  }

  get Id() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  get HtmlElement() {
    return this.htmlElement;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    throw new Error('You must implement render function');
  }

  mount(container) {
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

        Component.instances[this.Id] = this;

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
    this.htmlElement = document.getElementById(this.Id);
  }

  $render() {
    const el = Element.create(this.render());

    el.setAttribute('id', this.Id);
    if (this.Name) {
      el.setAttribute('name', this.Name);
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

  static getCmp(id) {
    return Component.instances[id] || null;
  }
}

Component.instances = [];
