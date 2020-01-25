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

    this.attachListeners(this.listeners);

    /*
    if (Component.instances[this.id]) {
      throw new Error(`
        Could create component [${this.constructor.name}.<${this.Id}>].
        Component with the same Id already exists ${Component.instances[this.Id].constructor.name}`
      );
    }
     */
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
    this.replaceElement(this.$render());
    setTimeout(() => this.fireEvent('show'), 0);
    return this;
  }

  hide() {
    if (this.isHidden()) {
      return this;
    }
    this.hidden = true;
    this.replaceElement(this.$createPlaceholder());
    setTimeout(() => this.fireEvent('hide'), 0);
    return this;
  }

  replaceElement(newHtmlElement, copyClassList) {
    const clone = document.getElementById(this.Id).cloneNode(true);
    this.htmlElement = newHtmlElement;
    this.containerHtmlElement.replaceChild(this.htmlElement, document.getElementById(this.Id));
    this.htmlElement.setAttribute('id', this.Id);
    if (copyClassList === true) {
      clone.classList.forEach((cssClass) => this.htmlElement.classList.add(cssClass));
    }
    return this;
  }

  removeAll() {
    if (!this.HtmlElement) {
      return this;
    }
    const node = this.HtmlElement;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    return this;
  }

  destroy() {
    if (!this.HtmlElement) {
      return false;
    }
    this.containerHtmlElement.removeChild(this.HtmlElement);
    this.htmlElement = null;
    this.containerHtmlElement = null;
    this.parentComponent = null;
    delete Component.instances[this.Id];
    return true;
  }

  isHidden() {
    return this.hidden;
  }

  toggle() {
    if (this.isHidden()) {
      this.show();
    } else {
      this.hide();
    }
    return this;
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
    return this;
  }

  attachListeners(listeners) {
    Object
      .keys(listeners)
      .forEach((eventType) => {
        this.on(eventType, listeners[eventType]);
      });
    return this;
  }

  fireEvent(eventType, props) {
    if (props === null || props === undefined) {
      super.fireEvent(eventType, { component: this });
    } else {
      super.fireEvent(eventType, { ...props, ...{ component: this } });
    }
    return this;
  }

  mount(container, mode) {
    setTimeout(() => this.$mount(container, mode || 'append'), 0);
    return this;
  }

  refresh() {
    if (!this.HtmlElement) {
      return this;
    }
    this.replaceElement(this.$render());
    return this;
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

    setTimeout(() => this.fireEvent('afterrender'), 0);

    return newElement;
  }

  $mount(container, mode) {
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
      if (mode === 'append') {
        this.containerHtmlElement
          .appendChild(this.htmlElement);
      } else if (mode === 'first') {
        this.containerHtmlElement
          .insertBefore(this.htmlElement, this.containerHtmlElement.firstChild);
      } else {
        throw new Error(`Unknown mount mode "${mode}"`);
      }
      Component.instances[this.Id] = this;
      this.fireEvent('mount');
      return;
    }

    throw new Error(
      `Could not mount component [${this.constructor.name}.<${this.Id}>] to unresolved container`,
    );
  }

  $createPlaceholder() {
    return Element.create({
      tag: 'span',
      attributes: { id: this.Id, style: 'width:0px;height:0px;' },
    });
  }

  static get(id) {
    return Component.instances[id] || null;
  }

  static has(id) {
    return Component.instances[id] !== undefined;
  }
}

Component.instances = {};
