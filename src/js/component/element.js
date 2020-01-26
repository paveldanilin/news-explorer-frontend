export default class Element {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.oldStyleDisplay = null;
  }

  get ClassList() {
    if (this.htmlElement) {
      return this.htmlElement.classList;
    }
    return new NodeList();
  }

  get HtmlElement() {
    return this.htmlElement;
  }

  hide() {
    if (this.htmlElement && this.htmlElement.style.display !== 'none') {
      this.oldStyleDisplay = this.htmlElement.style.display;
      this.htmlElement.style.display = 'none';
    }
    return this;
  }

  show() {
    if (this.htmlElement && (this.htmlElement.style.display === null || this.htmlElement.style.display === 'none')) {
      this.htmlElement.style.display = this.oldStyleDisplay;
    }
    return this;
  }

  isVisible() {
    if (this.htmlElement) {
      return this.htmlElement.style.display !== 'none'
        && this.htmlElement.style.display !== undefined
        && this.htmlElement.style.display !== null;
    }
    return false;
  }

  pos(x, y) {
    if (this.htmlElement) {
      if (typeof x === 'number') {
        this.htmlElement.style.left = `${x}px`;
      } else {
        this.htmlElement.style.left = x;
      }
      if (typeof y === 'number') {
        this.htmlElement.style.top = `${y}px`;
      } else {
        this.htmlElement.style.top = y;
      }
    }
    return this;
  }

  posStyle(style) {
    if (this.htmlElement) {
      this.htmlElement.style.position = style;
    }
    return this;
  }

  mount(hostHtmlElement) {
    let host;
    if (typeof hostHtmlElement === 'string') {
      host = document.querySelector(hostHtmlElement);
    } else if (hostHtmlElement instanceof HTMLElement) {
      host = hostHtmlElement;
    } else {
      throw new Error('Host element must be an instance of HTMLElement');
    }
    host.appendChild(this.htmlElement);
    return this;
  }

  text(text) {
    if (this.htmlElement) {
      this.htmlElement.textContent = text;
    }
    return this;
  }

  on(eventType, handler) {
    if (this.htmlElement) {
      this.htmlElement.addEventListener(eventType, (event) => handler(event));
    }
    return this;
  }

  static wrap(selector) {
    let el;
    if (typeof selector === 'string') {
      el = document.querySelector(selector);
    } else {
      el = selector;
    }
    if (!el) {
      return null;
    }
    return new this(el);
  }

  static $(selector) {
    return document.querySelectorAll(selector);
  }

  static create(def, wrap) {
    let el;
    if (typeof def === 'string') {
      el = Element.createFromHtml(def);
    } else {
      el = Element.createFromDef(def);
    }
    if (wrap === true) {
      el = new this(el);
    }
    return el;
  }

  static createFromDef(def) {
    if (typeof def !== 'object' || def === null) {
      throw new Error('Expected object');
    }

    if (!('tag' in def)) {
      throw new Error('A mandatory `tag` attribute has been missed');
    }

    const tag = Element.filterTag(def.tag);
    const classList = Element.filterClassList(def.classList || []);
    const attributes = Element.filterAttributes(def.attributes || {});
    const listeners = Element.filterListeners(def.listeners || {});
    const children = Element.filterChildren(def.children || []);

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
    children.forEach((elDef) => {
      element.appendChild(Element.create(elDef));
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

  static createFromHtml(html) {
    if (typeof html !== 'string') {
      throw new Error('Expected string');
    }
    const tmp = document.createElement('span');
    tmp.innerHTML = html;
    return tmp.firstChild;
  }

  static offset(el) {
    let targetEl;
    if (el instanceof Element) {
      targetEl = el.HtmlElement;
    } else {
      targetEl = el;
    }
    const rect = targetEl.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  static isDomEvent(eventName) {
    return [
      'click',
      'mouseover',
      'mouseout',
      'keyup',
      'keydown',
      'keypress',
      'change',
      'blur',
      'dblclick',
      'focus',
      'onload',
      'onerror',
    ].includes(eventName);
  }
}
