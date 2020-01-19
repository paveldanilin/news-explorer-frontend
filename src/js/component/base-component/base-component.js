import {
  createState, notify, query, watch,
} from './state';
import Element from './element';

/**
 * Hooks:
 * onInit
 * onUpdate
 * onRender
 */
export default class BaseComponent {
  constructor(selector, state, watchers, broadcastAll) {
    this.id = BaseComponent.genId();
    this.selector = selector || 'body';
    this.hostHtmlElement = null;
    this.dataBindings = [];
    this.$hostElementStyleDisplay = null;
    const $watchers = watchers || {};
    $watchers.$onChange = (event) => this.$update(event);
    this.state = createState(
      state || {},
      $watchers,
      broadcastAll || false,
    );
  }

  get Name() {
    return this.constructor.name;
  }

  get Id() {
    return this.id;
  }

  get State() {
    return this.state;
  }

  get Selector() {
    return this.selector;
  }

  get HostHtmlElement() {
    return this.hostHtmlElement;
  }

  hide() {
    if (this.HostHtmlElement) {
      if (this.$hostElementStyleDisplay === null) {
        this.$hostElementStyleDisplay = this.HostHtmlElement.style.display;
      }
      this.HostHtmlElement.style.display = 'none';
    }
  }

  show() {
    if (this.HostHtmlElement && this.$hostElementStyleDisplay) {
      this.HostHtmlElement.style.display = this.$hostElementStyleDisplay;
      this.$hostElementStyleDisplay = null;
    }
  }

  /**
   * @returns {boolean}
   */
  isHidden() {
    return this.HostHtmlElement && this.HostHtmlElement.style.display === 'none';
  }

  hasState(path) {
    return path in this.State;
  }

  getState(path) {
    return query(this.State, path);
  }

  /**
   * Selects nested HtmlElements
   * @param selector
   * @returns {NodeList}
   */
  $(selector) {
    if (this.HostHtmlElement) {
      return this.HostHtmlElement.querySelectorAll(selector);
    }
    return new NodeList();
  }

  /**
   * Listens to DOM event
   * @param selector
   * @param event
   * @param handler
   */
  listen(selector, event, handler) {
    this.$(selector)
      .forEach((htmlElement) => htmlElement.addEventListener(event, handler));
  }

  /**
   * Watches to event bus
   * @param eventType
   * @param handler
   * @returns {{unsubscribe}}
   */
  watch(eventType, handler) {
    if (handler === null || handler === undefined) {
      const handlerName = `on${BaseComponent.toCamelCase(eventType)}`;
      if (!this.$hasMethod(handlerName)) {
        throw new Error(`Not defined handler for eventType "${eventType}"`);
      }
      return watch(eventType, (event) => this.$callMethod(handlerName, event));
    }
    return watch(eventType, handler);
  }

  /**
   * Notifies all components about event
   * @param eventType
   * @param props
   */
  notify(eventType, props) {
    return notify(eventType, { source: this, ...props });
  }

  $render() {
    if (this.hostHtmlElement === null || !this.$hasMethod('onRender')) {
      return;
    }
    const definition = this.$callMethod('onRender');
    if (typeof definition === 'string') {
      this.hostHtmlElement.innerHTML = definition;
    } else if (typeof definition === 'object') {
      this.hostHtmlElement.innerHTML = '';
      this.hostHtmlElement.appendChild(Element.create(definition).render().DomElement);
    }
  }

  $update(event) {
    this.$render();
    setTimeout(() => {
      this.$updateBindings(event);
    }, 0);
    setTimeout(() => {
      this.$callMethod('onUpdate', event);
    }, 0);
  }

  $mountTo(htmlElement) {
    if (!htmlElement) {
      return;
    }

    this.hostHtmlElement = htmlElement;
    this.hostHtmlElement.setAttribute('data-component-name', this.Name);
    this.hostHtmlElement.setAttribute('data-component-id', this.Id);
    if (!this.hostHtmlElement.hasAttribute('id')) {
      this.hostHtmlElement.setAttribute('id', this.Id);
    }

    BaseComponent.instances[this.Id] = this;

    this.$update({});

    setTimeout(() => this.$callMethod('onInit'), 0);
  }

  $collectBindings() {
    if (!this.HostHtmlElement) {
      return;
    }
    // Host element bindings
    if (this.HostHtmlElement.hasAttribute('data-bind')) {
      this.$pushBinding(this.HostHtmlElement.getAttribute('data-bind'), this.HostHtmlElement);
    }
    // Nested elements binding
    this.$('[data-bind]').forEach((htmlElement) => {
      if (htmlElement.hasAttribute('data-component-id') === false) {
        // Ignore nested components
        this.$pushBinding(htmlElement.getAttribute('data-bind'), htmlElement);
      }
    });
  }

  $pushBinding(state, htmlElement) {
    if (!(state in this.State)) {
      throw new Error(
        `[${this.Name}] could not bind to state with name "${state}" since it is does not exists`,
      );
    }
    this.dataBindings.push({
      state, htmlElement, template: htmlElement.innerHTML,
    });
  }

  $updateBindings(event) {
    for (let i = 0; i < this.dataBindings.length; i += 1) {
      const binding = this.dataBindings[i];
      if (event && binding.state === event.path) {
        binding.htmlElement.innerHTML = BaseComponent.interpolate(binding.template, this.State);
      }
    }
  }

  $callMethod(methodName, ...args) {
    if (this.$hasMethod(methodName)) {
      return this[methodName](args);
    }
    return undefined;
  }

  $hasMethod(methodName) {
    return typeof this[methodName] === 'function';
  }

  static mount(components) {
    components.forEach((componentFactory) => {
      let instance = null;
      if (typeof componentFactory === 'function') {
        instance = componentFactory();
      } else if (typeof componentFactory === 'string') {
        instance = new window[componentFactory]();
      } else {
        throw new Error('Unexpected component factory type. Must be either: string or function');
      }
      if (instance instanceof BaseComponent) {
        const hostElmSelector = instance.Selector || 'body';
        document
          .querySelectorAll(hostElmSelector)
          .forEach((htmlElement) => {
            instance.$mountTo(htmlElement);
          });
      } else {
        throw new Error('Could not create instance of Component');
      }
    });

    Object.keys(BaseComponent.instances).forEach((cmpId) => {
      BaseComponent.instances[cmpId].$collectBindings();
    });
  }

  static getComponent(id) {
    if (id in BaseComponent.instances) {
      return BaseComponent.instances[id];
    }
    const htmlElement = document.getElementById(id);
    if (htmlElement && htmlElement.hasAttribute('data-component-id')) {
      const cmpId = htmlElement.getAttribute('data-component-id');
      if (cmpId in BaseComponent.instances) {
        return BaseComponent.instances[cmpId];
      }
    }
    return null;
  }

  static genId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-mixed-operators,no-bitwise
      const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static interpolate(text, scope) {
    const startSymbol = '{{';
    const endSymbol = '}}';
    const startSymbolLength = startSymbol.length;
    const endSymbolLength = endSymbol.length;
    const inputText = text.trim();
    const textLength = inputText.length;
    const concat = [];
    const expressions = [];
    const expressionPositions = [];
    let startIndex = 0;
    let endIndex = 0;
    let index = 0;

    while (index < textLength) {
      startIndex = inputText.indexOf(startSymbol, index);
      endIndex = inputText.indexOf(endSymbol, startIndex + startSymbolLength);

      if (startIndex !== -1 && endIndex !== -1) {
        if (index !== startIndex) {
          concat.push(inputText.substring(index, startIndex));
        }
        const exp = inputText.substring(startIndex + startSymbolLength, endIndex);
        expressions.push(exp);
        index = endIndex + endSymbolLength;
        expressionPositions.push(concat.length);
        concat.push('');
      } else {
        if (index !== textLength) {
          concat.push(inputText.substring(index));
        }
        break;
      }
    }

    expressionPositions.forEach((pos, expIndex) => {
      concat[pos] = query(scope, expressions[expIndex]);
    });

    return concat.join('');
  }

  static toCamelCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(
        /\S+\s*/g,
        (word, index) => {
          if (index === 0) {
            return word.toLowerCase();
          }
          const w = word.toLowerCase();
          return w[0].toUpperCase() + w.substring(1);
        },
      ).replace(/\s+/g, '');
  }
}
BaseComponent.instances = {};
