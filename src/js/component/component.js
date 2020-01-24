import Element from './element';
import Observable from './observable';
import UuidGenerator from '../util/uuid-generator';

export default class Component extends Observable {
  constructor(props) {
    super();
    // HTML
    this.htmlElement = null;
    this.containerHtmlElement = null;
    // Component props
    this.id = props.id || UuidGenerator.generate();
    this.name = props.name || null;
    this.hidden = props.hidden || false;
    this.classList = props.classList || [];
    this.listeners = props.listeners || {};
    this.parentComponent = null;

    Object
      .keys(this.listeners)
      .forEach((eventType) => {
        this.on(eventType, this.listeners[eventType]);
      });
  }

  static create(props) {
    const component = new this(props);
    const { container } = props;
    if (container) {
      return component.mount(container);
    }
    return component;
  }

  get Id() {
    return this.id;
  }

  /**
   * @returns {string|null}
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns {null|HTMLElement}
   */
  get HtmlElement() {
    return this.htmlElement;
  }

  /**
   * @returns {null|HTMLElement}
   */
  get ContainerHtmlElement() {
    return this.containerHtmlElement;
  }

  /**
   * @returns {null|Component}
   */
  get ParentComponent() {
    return this.parentComponent;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    throw new Error('You must implement render function');
  }

  show() {
    if (this.isHidden() === false) {
      return this;
    }
    this.hidden = false;
    this.htmlElement = this.$render();
    this.containerHtmlElement.replaceChild(this.htmlElement, document.getElementById(this.Id));
    return this;
  }

  hide() {
    if (this.isHidden()) {
      return this;
    }
    this.hidden = true;
    this.containerHtmlElement
      .replaceChild(this.$createPlaceholder(), this.htmlElement);
    return this;
  }

  isHidden() {
    return this.hidden;
  }

  on(eventType, handler) {
    if (Element.isDomEvent(eventType)) {
      super.on('render', (event) => {
        event.element.addEventListener(eventType, (domEvent) => {
          handler({ component: this, domEvent });
        });
      });
    } else {
      super.on(eventType, handler);
    }
  }

  fireEvent(eventType, props) {
    if (props === null || props === undefined) {
      super.fireEvent(eventType, { component: this });
    } else {
      super.fireEvent(eventType, { ...props, ...{ component: this } });
    }
  }

  mount(container) {
    setTimeout(() => this.$mount(container), 0);
  }

  refresh() {
    if (!this.HtmlElement) {
      return;
    }
    this.ContainerHtmlElement.replaceChild(this.$render(), this.htmlElement);
    this.htmlElement = document.getElementById(this.Id);
  }

  $render() {
    if (this.isHidden()) {
      return this.$createPlaceholder();
    }

    const newElement = Element.create(this.render());

    newElement.setAttribute('id', this.Id);

    if (this.Name) {
      newElement.setAttribute('name', this.Name);
    }

    this.classList.forEach((cssClass) => newElement.classList.add(cssClass));

    this.fireEvent('render', { element: newElement });

    return newElement;
  }

  $mount(container) {
    const containerSelector = container || 'body';
    this.containerHtmlElement = null;

    if (typeof containerSelector === 'string') {
      this.containerHtmlElement = document.querySelector(containerSelector);
    }

    if (container instanceof Component) {
      this.containerHtmlElement = container.HtmlElement;
      this.parentComponent = container;
    }

    if (this.containerHtmlElement instanceof HTMLElement) {
      this.htmlElement = this.$render();
      this.containerHtmlElement.appendChild(this.htmlElement);
      if (Component.instances[this.id]) {
        throw new Error(`Could create component [${this.constructor.name}.<${this.Id}>].
        Component with the same Id already exists ${Component.instances[this.Id].constructor.name}`);
      }
      Component.instances[this.Id] = this;
      this.fireEvent('mount');
      return;
    }

    throw new Error(`Could not render component [${this.constructor.name}.<${this.Id}>] to unresolved container`);
  }

  $createPlaceholder() {
    return Element.create({ tag: 'span', attributes: { id: this.Id, style: 'width:0px;height:0px;' } });
  }

  static getCmp(id) {
    return Component.instances[id] || null;
  }
}

Component.instances = [];
