import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './components/components';

import Dialog from './components/dialog/dialog';
import { container } from './container';

function signinHandler(el) {
  Dialog.close('dialog_signin');
}

class BaseComponent {
  constructor({ selector, template = '', templateUrl = '' } = {}) {
    this.init(selector, template, templateUrl);
  }

  init(selector, template, templateUrl) {
    this.componentId = 'COMPONENT_' + (+new Date).toString(16);
    this.selector = selector;
    this.template = template;
    this.templateUrl = templateUrl;
    this.htmlElement = null;
  }

  getSelector() {
    return this.selector;
  }

  bindHtmlElement(htmlElement) {
    this.htmlElement = htmlElement;
  }

  interpolate(html, options) {
    const re = /<%([^%>]+)?%>/g;
    const reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    let code = 'var r=[];\\n';
    let cursor = 0;
    let match;
    const add = (line, js) => {
      js? (code += line.match(reExp) ? line + '\\n' : 'r.push(' + line + ');\\n') :
        (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\\\"') + '");\\n' : '');
      return add;
    }

    while(match = re.exec(html)) {
      add(html.slice(cursor, match.index))(match[1], true);
      cursor = match.index + match[0].length;
    }

    add(html.substr(cursor, html.length - cursor));

    code += 'return r.join("");';

    return new Function(code.replace(/[\\r\\t\\n]/g, '')).apply(options);
  }

  render() {
    this.htmlElement.innerHTML = this.interpolate(this.template, {
      id: 123
    });
  }
}

class TestComponent extends BaseComponent {
  constructor() {
    super({
      selector: 'test',
      template: '<%this.id%>'
    });
  }
}

container.register('test', TestComponent);

function appRun(container) {
  const components = container.getServices();

  const instances = new Map();

  for (const componentName of components) {
    const component = container.get(componentName);
    const elements = document.querySelectorAll(`[data-component-${component.getSelector()}]`);
    elements.forEach((el) => {
      component.bindHtmlElement(el);
      instances.set(component.componentId, component);
    });
  }

  instances.forEach((cmp) => {
    cmp.render();
  });
}

appRun(container);

export { Dialog, signinHandler };
