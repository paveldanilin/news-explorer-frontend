
export default class HtmlElement2 {

  /**
   * @param tag
   * @param classList
   * @param attributes
   * @param listeners
   * @param children
   */
  constructor(tag, classList, attributes, listeners, children) {
    this._tag = HtmlElement2.filterTag(tag);
    this._classList = HtmlElement2.filterClassList(classList);
    this._attributes = HtmlElement2.filterAttributes(attributes);
    this._listeners = HtmlElement2.filterListeners(listeners);
    this._children = HtmlElement2.filterChildren(children).map((def) => HtmlElement2.create(def));
    this._htmlElement = null;
  }

  get tag() {
    return this._tag;
  }

  get classList() {
    return this._classList;
  }

  get attributes() {
    return this._attributes;
  }

  get listeners() {
    return this._listeners;
  }

  get children() {
    return this._children;
  }

  get htmlElement() {
    return this._htmlElement;
  }

  get isRendered() {
    return this._htmlElement !== null;
  }

  createDOM() {
    if (this.isRendered) {
      return this;
    }

    this._htmlElement = document.createElement(this.tag);

    // Add Css classes
    this.classList
      .forEach((cssClass) => this.htmlElement.classList.add(cssClass));

    // Inject attributes
    Object
      .keys(this.attributes)
      .forEach((attributeName) => {
        this.htmlElement.setAttribute(attributeName, this.attributes[attributeName]);
      });

    // Attach listeners
    Object.keys(this.listeners).forEach((eventName) => {
      this.htmlElement.addEventListener(eventName, this.listeners[eventName]);
    });

    // Render child
    this.children.forEach((childElement) => {
      this.htmlElement.appendChild(childElement.createDOM().htmlElement);
    });

    return this;
  }

  static create(htmlElementDef) {
    if (typeof htmlElementDef !== 'object' || htmlElementDef === null) {
      throw new Error('"htmlElementDef" must be an object');
    }

    if (!('tag' in htmlElementDef)) {
      throw new Error('A mandatory `tag` attribute has been missed');
    }

    return new HtmlElement2(
      htmlElementDef.tag,
      htmlElementDef.classList || [],
      htmlElementDef.attributes || {},
      htmlElementDef.listeners || {},
      htmlElementDef.children || [],
    );
  }

  static filterTag(tag) {
    if (typeof tag !== 'string') {
      throw new Error('"tag" must be a string');
    }

    if (tag.trim().length === 0) {
      throw new Error('"tag" must be a non empty string');
    }

    return tag.toLowerCase();
  }

  static filterClassList(classList) {
    if (!Array.isArray(classList)) {
      throw new Error('"classList" must be an array')
    }

    return classList;
  }

  static filterAttributes(attributes) {
    if (typeof attributes !== 'object') {
      throw new Error('"attributes" must be an object');
    }
    if (attributes === null) {
      return {};
    }
    return attributes;
  }

  static filterListeners(listeners) {
    if (typeof listeners !== 'object') {
      throw new Error('"listeners" must be an object');
    }
    if (listeners === null) {
      return {};
    }
    Object.keys(listeners).forEach((listenerName) => {
      if (typeof listeners[listenerName] !== 'function') {
        throw new Error(`The ${listenerName} listener must be a function`);
      }
    });
    return listeners;
  }

  static filterChildren(children) {
    if (!Array.isArray(children)) {
      throw new Error('"children" must be an array');
    }
    return children;
  }
}

HtmlElement2.create({
  tag: 'div',
  children: [
    {
      tag: 'span'
    }
  ]
});
