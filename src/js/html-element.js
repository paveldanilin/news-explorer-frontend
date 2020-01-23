export default class HtmlElement {
  /**
   * @param element {
   *   tag: '',
   *   classList: [],
   *   attributes: {},
   *   listeners: {},
   *   children: [],
   * }
   * @param container A host HtmlElement
   * @returns {any}
   */
  static render(element, container) {
    if (typeof element !== 'object' || element === null) {
      throw new Error('Expected object');
    }

    if (!('tag' in element)) {
      throw new Error('A mandatory `tag` attribute has been missed');
    }

    const htmlElement = HtmlElement.create(
      element.tag,
      element.classList || [],
      element.attributes || {},
      element.listeners || {},
      element.children || [],
    );

    if (container) {
      container.appendChild(htmlElement);
    }

    return htmlElement;
  }

  /**
   * @param tag
   * @param classList
   * @param attributes
   * @param listeners
   * @param children
   * @returns {any}
   */
  static create(tag, classList, attributes, listeners, children) {
    const htmlElement = document.createElement(tag);

    // Add Css classes
    classList
      .forEach((cssClass) => htmlElement.classList.add(cssClass));

    // Inject attributes
    Object
      .keys(attributes)
      .forEach((attributeName) => {
        htmlElement[attributeName] = attributes[attributeName];
      });

    // Attach listeners
    Object.keys(listeners).forEach((eventName) => {
      const handler = listeners[eventName];
      if (typeof handler !== 'function') {
        throw new Error(`A listener for ${tag}.${eventName} must be a function`);
      }
      htmlElement.addEventListener(eventName, handler);
    });

    // Render child
    children.forEach((childElement) => {
      htmlElement.appendChild(HtmlElement.render(childElement));
    });

    return htmlElement;
  }
}
