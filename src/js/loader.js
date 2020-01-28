import HttpClient from './http-client/http-client';

const httpClient = HttpClient.create({
  responseFormat: HttpClient.RESPONSE_TEXT,
});

const loadHTML = (url, container, onLoad, onInject) => {
  let loadedTemplate = '';
  let containers = !container ? [] : [container];

  if (typeof container === 'string') {
    containers = document.querySelectorAll(container);
  }

  httpClient.fetch(url).then((templateHTML) => {
    if (typeof onLoad === 'function') {
      loadedTemplate = onLoad(templateHTML);
    } else {
      loadedTemplate = templateHTML;
    }

    containers.forEach((containerEl) => {
      const el = containerEl;
      el.insertAdjacentHTML('afterbegin', loadedTemplate);
      if (typeof onInject === 'function') {
        onInject(el, loadedTemplate);
      }
    });
  });
};

const loadJS = (url) => {
  const ref = document.querySelectorAll('script')[0];
  const script = document.createElement('script');
  script.src = url;
  ref.parentNode.insertBefore(script, ref);
};

export { loadHTML, loadJS };
