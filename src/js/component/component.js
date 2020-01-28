import Element from './element';
import Observable from './observable';
import UuidGenerator from '../util/uuid-generator';

export default class Component extends Observable {
  constructor(props) {
    super();
    this._htmlElement = null;
    this._containerHtmlElement = null;
    this._id = props.id || UuidGenerator.generate();
    this._name = props.name || null;
    this._hidden = props.hidden || false;
    this._classList = props.classList || [];
    this._listeners = props.listeners || {};
    this._parentComponent = null;
    this._placeholderTag = props.placeholderTag || 'span';

    this.attachListeners(this._listeners);

    /*
    if (Component.instances[this.id]) {
      throw new Error(`
        Could create component [${this.constructor.name}.<${this.Id}>].
        Component with the same Id already exists ${Component.instances[this.Id].constructor.name}`
      );
    }
     */
  }

  /**
   * @param props
   * @returns {Component|StorableComponent}
   */
  static create(props) {
    const component = new this(props);
    const { container } = props;
    if (container) {
      return component.mount(container);
    }
    return component;
  }

  get Id() {
    return this._id;
  }

  /**
   * @returns {string|null}
   */
  get Name() {
    return this._name;
  }

  /**
   * @returns {null|HTMLElement}
   */
  get HtmlElement() {
    return this._htmlElement;
  }

  /**
   * @returns {null|HTMLElement}
   */
  get ContainerHtmlElement() {
    return this._containerHtmlElement;
  }

  /**
   * @returns {null|Component}
   */
  get ParentComponent() {
    return this._parentComponent;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    throw new Error('You must implement render function');
  }

  show() {
    if (this.isHidden() === false) {
      return this;
    }
    this._hidden = false;
    this.replaceElement(this.$render());
    setTimeout(() => this.fireEvent('show'), 0);
    return this;
  }

  hide() {
    if (this.isHidden()) {
      return this;
    }
    this._hidden = true;
    this.replaceElement(this.$createPlaceholder());
    setTimeout(() => this.fireEvent('hide'), 0);
    return this;
  }

  replaceElement(newHtmlElement, copyClassList) {
    const clone = document.querySelector(`[id="${this.Id}"]`).cloneNode(true);
    this._htmlElement = newHtmlElement;
    this._containerHtmlElement.replaceChild(this._htmlElement, document.querySelector(`[id="${this.Id}"]`));
    this._htmlElement.setAttribute('id', this.Id);
    if (copyClassList === true) {
      clone.classList.forEach((cssClass) => this._htmlElement.classList.add(cssClass));
    }
    return this;
  }

  removeAll() {
    if (!this.HtmlElement) {
      return this;
    }
    /*
    const node = this.HtmlElement;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    } */
    Element.wrap(this.HtmlElement).removeChild();
    return this;
  }

  destroy() {
    if (!this.HtmlElement) {
      return false;
    }
    this._containerHtmlElement.removeChild(this.HtmlElement);
    this._htmlElement = null;
    this._containerHtmlElement = null;
    this._parentComponent = null;
    delete Component.instances[this.Id];
    return true;
  }

  isHidden() {
    return this._hidden;
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

    this._classList.forEach((cssClass) => newElement.classList.add(cssClass));

    this.fireEvent('render', { element: newElement });

    setTimeout(() => this.fireEvent('afterrender'), 0);

    return newElement;
  }

  $mount(container, mode) {
    const containerSelector = container || 'body';
    this._containerHtmlElement = null;

    if (typeof containerSelector === 'string') {
      this._containerHtmlElement = document.querySelector(containerSelector);
    }

    if (container instanceof Component) {
      this._containerHtmlElement = container.HtmlElement;
      this._parentComponent = container;
    }

    if (this._containerHtmlElement instanceof HTMLElement) {
      this._htmlElement = this.$render();
      if (mode === 'append') {
        this._containerHtmlElement
          .appendChild(this._htmlElement);
      } else if (mode === 'first') {
        this._containerHtmlElement
          .insertBefore(this._htmlElement, this._containerHtmlElement.firstChild);
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
      tag: this._placeholderTag,
      attributes: { id: this.Id, style: 'width:0px;height:0px;' },
    });
  }

  $(selector, wrap) {
    if (this.HtmlElement) {
      if (wrap === true) {
        return Array
          .from(this.HtmlElement.querySelectorAll(selector))
          .map((node) => Element.wrap(node));
      }
      return Array.from(this.HtmlElement.querySelectorAll(selector));
    }
    return [];
  }

  /**
   * @param id
   * @returns {Component|StorableComponent|null}
   */
  static get(id) {
    return Component.instances[id] || null;
  }

  static has(id) {
    return Component.instances[id] !== undefined;
  }

  /**
   * Notifies all components about event
   * @param eventType
   * @param props
   */
  static notify(eventType, props) {
    Object
      .keys(Component.instances)
      .forEach((componentId) => Component.instances[componentId].fireEvent(eventType, props));
  }
}

Component.instances = {};
