export default class Element {
  constructor(htmlElement) {
    this._htmlElement = htmlElement;
    this._oldStyleDisplay = null;
  }

  get ClassList() {
    if (this._htmlElement) {
      return this._htmlElement.classList;
    }
    return new NodeList();
  }

  get HtmlElement() {
    return this._htmlElement;
  }

  hide() {
    if (this._htmlElement && this._htmlElement.style.display !== 'none') {
      this._oldStyleDisplay = this._htmlElement.style.display;
      this._htmlElement.style.display = 'none';
    }
    return this;
  }

  show() {
    if (this._htmlElement
      && (this._htmlElement.style.display === null || this._htmlElement.style.display === 'none')) {
      this._htmlElement.style.display = this._oldStyleDisplay;
    }
    return this;
  }

  isVisible() {
    if (this._htmlElement) {
      return this._htmlElement.style.display !== 'none'
        && this._htmlElement.style.display !== undefined
        && this._htmlElement.style.display !== null;
    }
    return false;
  }

  disable() {
    if (this._htmlElement) {
      this._htmlElement.disabled = true;
    }
    return this;
  }

  enable() {
    if (this._htmlElement) {
      this._htmlElement.disabled = false;
    }
    return this;
  }

  getValue() {
    if (this._htmlElement) {
      return this._htmlElement.value || null;
    }
    return null;
  }

  pos(left, top) {
    if (this._htmlElement) {
      if (typeof left === 'number') {
        this._htmlElement.style.left = `${left}px`;
      } else if (left !== undefined) {
        this._htmlElement.style.left = left;
      }
      if (typeof top === 'number') {
        this._htmlElement.style.top = `${top}px`;
      } else if (top !== undefined) {
        this._htmlElement.style.top = top;
      }
    }
    return this;
  }

  getRect() {
    if (!this._htmlElement) {
      return {
        top: -1, left: -1, width: -1, height: -1,
      };
    }
    return {
      top: this._htmlElement.offsetTop,
      left: this._htmlElement.offsetLeft,
      width: this._htmlElement.offsetWidth,
      height: this._htmlElement.offsetHeight,
    };
  }


  size(width, height) {
    if (this._htmlElement) {
      if (typeof width === 'number') {
        this._htmlElement.style.width = `${width}px`;
      } else if (width !== undefined) {
        this._htmlElement.style.width = width;
      }
      if (typeof height === 'number') {
        this._htmlElement.style.height = `${height}px`;
      } else if (height !== undefined) {
        this._htmlElement.style.height = height;
      }
    }
    return this;
  }

  posStyle(style) {
    if (this._htmlElement) {
      this._htmlElement.style.position = style;
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
    host.appendChild(this._htmlElement);
    return this;
  }

  text(text) {
    if (text === undefined && this._htmlElement) {
      return this._htmlElement.textContent;
    }
    if (this._htmlElement) {
      this._htmlElement.textContent = text;
    }
    return this;
  }

  on(eventType, handler) {
    if (this._htmlElement) {
      this._htmlElement.addEventListener(eventType, (event) => handler(event));
    }
    return this;
  }

  /**
   * @param html
   * @param position {string|undefined} 'beforebegin'|'afterbegin'|'beforeend'|'afterend'
   */
  insertHTML(html, position) {
    const insertPosition = position || 'afterbegin';
    if (this._htmlElement) {
      this._htmlElement.insertAdjacentHTML(insertPosition, html);
    }
    return this;
  }

  removeChild() {
    if (this._htmlElement) {
      const node = this._htmlElement;
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }
    return this;
  }

  html(html) {
    this.removeChild();
    this.insertHTML(html);
  }

  static wrap(selector) {
    let node;
    if (typeof selector === 'string') {
      node = document.querySelector(selector);
    } else {
      node = selector;
    }
    if (!node) {
      return null;
    }
    return new this(node);
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
    tmp.insertAdjacentHTML('afterbegin', html);
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
