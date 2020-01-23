import './__dual-ring/spinner__dual-ring.css';
import './spinner.css';

const isCssClassDeclared = (cls) => {
  for (let i = 0; i < document.styleSheets.length; i += 1) {
    const rules = document.styleSheets[i].cssRules;
    for (let j = 0; j < rules.length; j += 1) {
      const rule = rules[j];
      if (rule.selectorText === cls) {
        return true;
      }
    }
  }
  return false;
};

export default class Spinner {
  static show(name) {
    const spinnerCls = `spinner__${name}`;

    if (!isCssClassDeclared(`.${spinnerCls}`)) {
      // Unknown spinner
      return false;
    }

    if (Spinner.getActive()) {
      // already created
      return false;
    }

    const container = document.createElement('div');
    container.setAttribute('data-spinner', '');
    container.classList.add('spinner');

    const spinner = document.createElement('div');
    spinner.classList.add(spinnerCls);
    spinner.style.marginLeft = 'auto';
    spinner.style.marginRight = 'auto';
    spinner.style.marginTop = `${Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2}px`;

    container.appendChild(spinner);

    document.body.appendChild(container);

    return true;
  }

  static closeActive() {
    const spinnerEl = Spinner.getActive();
    if (spinnerEl) {
      spinnerEl.remove();
    }
  }

  static getActive() {
    return document.querySelector('[data-spinner]');
  }
}
