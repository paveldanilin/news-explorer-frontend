export default class Element {
  /**
   * @param tag
   * @param classList
   * @param attributes
   * @param listeners
   * @param children
   */
  constructor(tag, classList, attributes, listeners, children) {
    this.def = {
      tag,
      classList: classList || [],
      attributes: attributes || {},
      listeners: listeners || {},
      children: children || [],
    };
    this.element = null;
  }

  get DomElement() {
    return this.element;
  }

  hasAttribute(name) {
    return this.element.hasAttribute(name);
  }

  getAttribute(name) {
    return this.element.getAttribute(name);
  }

  render(renderTo) {
    if (this.element) {
      return this;
    }
    this.element = Element.createDOM(this.def);
    if (renderTo) {
      renderTo.appendChild(this.DomElement);
    }
    return this;
  }

  query(selector) {
    if (this.DomElement === null) {
      return null;
    }
    return this.DomElement.querySelector(selector);
  }

  queryAll(selector) {
    if (this.DomElement === null) {
      return new NodeList();
    }
    return this.DomElement.querySelectorAll(selector);
  }

  set textContent(textContent) {
    this.def.attributes.textContent = textContent;
    if (this.DomElement === null) {
      return;
    }
    this.DomElement.textContent = textContent;
  }

  get textContent() {
    if (this.DomElement === null) {
      return this.def.attributes.textContent;
    }
    return this.DomElement.textContent;
  }

  static create(htmlElementDef) {
    return new Element(
      htmlElementDef.tag || '',
      htmlElementDef.classList || [],
      htmlElementDef.attributes || {},
      htmlElementDef.listeners || {},
      htmlElementDef.children || [],
    );
  }

  static bindTo(domElement) {
    const htmlElement = new Element(domElement.tagName);
    htmlElement.element = domElement;
    return htmlElement;
  }

  static createDOM(htmlElementDef) {
    if (typeof htmlElementDef !== 'object' || htmlElementDef === null) {
      throw new Error('"htmlElementDef" must be an object');
    }

    if (!('tag' in htmlElementDef)) {
      throw new Error('A mandatory `tag` attribute has been missed');
    }

    const tag = Element.filterTag(htmlElementDef.tag);
    const classList = Element.filterClassList(htmlElementDef.classList || []);
    const attributes = Element.filterAttributes(htmlElementDef.attributes || {});
    const listeners = Element.filterListeners(htmlElementDef.listeners || {});
    const children = Element.filterChildren(htmlElementDef.children || []);

    const element = document.createElement(tag);

    // Add Css classes
    classList
      .forEach((cssClass) => element.classList.add(cssClass));

    // Inject attributes
    Object
      .keys(attributes)
      .forEach((attributeName) => {
        if (attributeName === 'textContent') {
          element.textContent = attributes[attributeName];
        } else {
          element.setAttribute(attributeName, attributes[attributeName]);
        }
      });

    // Attach listeners
    Object.keys(listeners).forEach((eventName) => {
      element.addEventListener(eventName, listeners[eventName]);
    });

    // Render child
    children.forEach((def) => {
      element.appendChild(Element.createDOM(def));
    });

    return element;
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
      throw new Error('"classList" must be an array');
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
